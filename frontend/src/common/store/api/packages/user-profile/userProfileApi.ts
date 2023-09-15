import { ProfileDto } from 'src/common/packages/user/common/user-profile/types/dto/ProfileDto';
import { apiSlice } from '../../api';
import { UpdateProfileDto } from 'src/common/packages/user/common/user-profile/types/dto/UpdateProfileDto';
import { StripeAccountDto } from 'src/common/packages/user/common/user-profile/types/dto/StripeAccountDto';

export const profileApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getProfile: build.query<ProfileDto, number>({
      query: id => ({
        url: `/profile/${id}`,
      }),
    }),
    updateProfile: build.mutation<ProfileDto, { id: number; body: UpdateProfileDto }>({
      query: args => ({
        url: `/profile/${args.id}`,
        method: 'PATCH',
        body: args.body,
      }),
    }),
    haveStripeAccount: build.query<StripeAccountDto, number>({
      query: id => ({
        url: `/profile/${id}/stripe-account`,
      }),
    }),
  }),
});
