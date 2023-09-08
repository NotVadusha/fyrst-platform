import { apiSlice } from '../../api';
import { RegisterStripeAccountLinkDto } from 'src/common/packages/stripe/types/dto/RegisterStripeAccountLinkDto';

export const stripeApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getAccountRegistrationLink: build.query<RegisterStripeAccountLinkDto, number>({
      query: id => `/stripe/${id}/stripe-link`,
    }),
  }),
});
