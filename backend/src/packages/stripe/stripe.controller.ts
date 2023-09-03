import { Body, Controller, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post('/intents')
  async initialize(@Body() body: any) {
    return this.stripeService.initializeIntents();
  }
}
