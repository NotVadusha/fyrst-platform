import { ProfileDto } from 'src/common/packages/user/common/user-profile/types/dto/ProfileDto';
import { apiSlice } from '../apiSlice';
import { UpdateProfileDto } from 'src/common/packages/user/common/user-profile/types/dto/UpdateProfileDto';

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
  }),
});
