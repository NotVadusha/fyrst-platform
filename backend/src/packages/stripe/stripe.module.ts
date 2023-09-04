import { Module, forwardRef } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { PaymentModule, UserProfileModule } from '..';

@Module({
  controllers: [StripeController],
  providers: [StripeService],
  imports: [forwardRef(() => PaymentModule), UserProfileModule],
  exports: [StripeService],
})
export class StripeModule {}
