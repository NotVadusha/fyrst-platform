import { Injectable } from '@nestjs/common';

import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-08-16',
    });
  }

  async initializeIntents() {
    return this.stripe.paymentIntents.create({
      amount: 10000,
      currency: 'usd',
      payment_method_types: ['card'],
    });
  }
}
