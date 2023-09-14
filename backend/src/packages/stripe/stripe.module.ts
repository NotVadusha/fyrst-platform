import { Module, forwardRef } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';

import {
  InvoiceModule,
  PaymentModule,
  TaxModule,
  TimecardModule,
  UserProfileModule,
  NotificationModule,
} from '..';

@Module({
  controllers: [StripeController],
  providers: [StripeService],
  imports: [
    forwardRef(() => PaymentModule),
    UserProfileModule,
    forwardRef(() => InvoiceModule),
    TimecardModule,
    forwardRef(() => TaxModule),
    NotificationModule,
  ],
  exports: [StripeService],
})
export class StripeModule {}
