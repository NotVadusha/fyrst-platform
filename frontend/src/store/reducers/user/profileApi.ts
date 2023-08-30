import { ProfileDto } from 'types/dto/profile/ProfileDto';
import { apiSlice } from '../apiSlice';
import { UpdateProfileDto } from 'types/dto/profile/UpdateProfileDto';

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
