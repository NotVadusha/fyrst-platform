import { Module, forwardRef } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { NotificationModule, PaymentModule, UserProfileModule } from '..';

@Module({
  controllers: [StripeController],
  providers: [StripeService],
  imports: [forwardRef(() => PaymentModule), UserProfileModule, NotificationModule],
  exports: [StripeService],
})
export class StripeModule {}
