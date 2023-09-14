import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  RawBodyRequest,
} from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentService } from '../payment/payment.service';
import { PaymentStatus } from 'shared/payment-status';
import { UserProfileService } from '../user-profile/user-profile.service';
import { NotificationService } from '../notification/notification.service';
import { successPaymentNotification } from 'shared/packages/notification/types/notificationTemplates';
import { TimecardService } from '../timecard/timecard.service';
import { InvoiceService } from '../invoice/invoice.service';
import { TimecardStatus } from 'shared/timecard-status';
import { TaxService } from '../tax/tax.service';
import { getTotal } from 'shared/getTotal';
import { getTotalTax } from 'shared/getTotalTax';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private paymentService: PaymentService,
    private userProfileService: UserProfileService,
    private notificationService: NotificationService,
    private timecardService: TimecardService,
    private invoiceService: InvoiceService,
    private taxService: TaxService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-08-16',
    });
  }

  async initializeIntent(id: number, userId: number) {
    const payment = await this.paymentService.findOneById(id, userId);
    const taxes = await this.taxService.findAllTaxesByPaymentId(payment.id);

    const totalTax = getTotalTax(taxes);

    const total = getTotal(
      { percentage: totalTax.percentage, additionalAmount: totalTax.additionalAmount },
      payment.amountPaid,
    );

    const intent = await this.stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: 'usd',
      payment_method_types: ['card'],
    });

    this.paymentService.update(
      id,
      {
        stripePaymentId: intent.id,
      },
      userId,
    );

    return intent;
  }

  async webhook(req: RawBodyRequest<Request>) {
    const sig = req.headers['stripe-signature'];
    const key = process.env.STRIPE_WEBHOOK_KEY;
    let event;

    try {
      event = this.stripe.webhooks.constructEvent(req.rawBody, sig, key);
    } catch (err) {
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        try {
          const paymentIntentSucceeded = event.data.object;

          const payment = await this.paymentService.findOneByPaymentId(paymentIntentSucceeded.id);
          const profile = await this.userProfileService.findOne(payment.timecard.employee.id);

          await this.stripe.transfers.create({
            amount: Math.round(payment.amountPaid * 100),
            currency: 'usd',
            destination: profile.stripeAccountId,
          });

          await this.stripe.payouts.create(
            {
              amount: Math.round(payment.amountPaid * 100),
              currency: 'usd',
            },
            {
              stripeAccount: profile.stripeAccountId,
            },
          );

          this.invoiceService.updateByTimecardId(payment.timecardId, {
            status: PaymentStatus.Completed,
          });

          this.timecardService.update(payment.timecardId, {
            status: TimecardStatus.Paid,
          });

          this.notificationService.create({
            recipientId: payment.timecard.approvedBy,
            content: successPaymentNotification(payment.timecard.booking.facility.name),
            type: 'payments',
            refId: payment.id,
          });
        } catch (err) {
          throw new InternalServerErrorException(`Payment Error: ${err.message}`);
        }
        break;
      case 'payment_intent.payment_failed':
        try {
          const paymentIntentFailed = event.data.object;

          const payment = await this.paymentService.findOneByPaymentId(paymentIntentFailed.id);

          this.invoiceService.updateByTimecardId(payment.timecardId, {
            status: PaymentStatus.Failed,
          });
        } catch (err) {
          throw new InternalServerErrorException(`Payment Error: ${err.message}`);
        }
        break;
      default:
        break;
    }
  }

  async createAccount() {
    const account = await this.stripe.accounts.create({
      type: 'express',
    });
    return account;
  }

  async getAccountLink(accountId: string, userId: number) {
    const accountLink = await this.stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${process.env.REACT_APP_API_URL}/stripe/confirm/${userId}/${accountId}`,
      return_url: `${process.env.CLIENT_URL}/profile/security`,
      type: 'account_onboarding',
    });
    return accountLink;
  }

  async getStripeAccountLink(userId: number) {
    try {
      const account = await this.createAccount();
      const accountLink = await this.getAccountLink(account.id, userId);
      return accountLink;
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
