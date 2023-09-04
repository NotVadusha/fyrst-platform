import { HttpException, HttpStatus, Injectable, RawBodyRequest } from '@nestjs/common';
import Stripe from 'stripe';
import { PaymentService } from '../payment/payment.service';
import { PaymentStatus } from 'shared/payment-status';
import { UserProfileService } from '../user-profile/user-profile.service';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private paymentService: PaymentService,
    private userProfileService: UserProfileService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-08-16',
    });
  }

  async initializeIntents(id: number) {
    const payment = await this.paymentService.findOneById(id);

    const intent = await this.stripe.paymentIntents.create({
      amount: +payment.amountPaid.toFixed(2) * 100,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    this.paymentService.update(id, {
      stripePaymentId: intent.id,
    });

    return intent;
  }

  async webhook(req: RawBodyRequest<Request>) {
    const sig = req.headers['stripe-signature'];
    const key =
      process.env.STRIPE_WEBHOOK_KEY ||
      'whsec_dd3abc4bd471a78a64d2b64843ea15f338f0a0c68a4ec72bb483a078c513e5fe';
    let event;

    try {
      event = this.stripe.webhooks.constructEvent(req.rawBody, sig, key);
    } catch (err) {
      throw new HttpException(`Webhook Error: ${err.message}`, HttpStatus.BAD_REQUEST);
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        try {
          const paymentIntentSucceeded = event.data.object;

          const payment = await this.paymentService.findOneByPaymentId(paymentIntentSucceeded.id);
          const profile = await this.userProfileService.findOne(payment.timecard.employee.id);

          await this.stripe.transfers.create({
            amount: payment.amountPaid - payment.amountPaid * 0.3,
            currency: 'usd',
            destination: profile.stripeAccountId,
          });

          this.paymentService.updateByPaymentId(paymentIntentSucceeded.id, {
            status: PaymentStatus.Completed,
          });
        } catch (err) {
          console.log(err);
          throw new HttpException(
            `Payment Error: ${err.message}`,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
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
      return_url: `${process.env.CLIENT_URL}/payments`,
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
      console.log(err);
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
