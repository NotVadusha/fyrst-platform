import { UpdateUserBody } from 'src/common/packages/user/types/dto/UserDto';
import { UserProfile } from 'src/common/packages/user/common/user-profile/types/models/UserProfile.model';
import { UserFilters } from 'src/common/packages/user/common/user-filters/types/models/UserFilters.model';
import { apiSlice } from '../../api';
import { User } from 'src/common/packages/user/types/models/User.model';
import { ProfileDto } from 'src/common/packages/user/common/user-profile/types/dto/ProfileDto';

export interface getUsersQueryParams {
  currentPage: number;
  filters: UserFilters;
}

interface getUsersPayload {
  users: User[];
  totalCount: number;
}

export const userApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getUsersByParams: build.query<getUsersPayload, getUsersQueryParams>({
      query: args => {
        const params = new URLSearchParams();

        Object.keys(args.filters).forEach(key =>
          params.set(key, String(args.filters[key as keyof UserFilters])),
        );

        const result = `/user?currentPage=${args.currentPage}&` + params;

        return result;
      },
    }),
    getAllUsers: build.query<User[], void>({
      query: () => '/user/many',
    }),
    addUsers: build.mutation<User[], User[]>({
      query: users => {
        return {
          url: `/user/many`,
          method: 'POST',
          body: users,
        };
      },
    }),
    addUser: build.mutation<User, UpdateUserBody>({
      query: user => {
        return {
          url: '/user',
          method: 'POST',
          body: user,
        };
      },
    }),
    getUser: build.query<User, number>({
      query: id => ({
        url: `/user/${id}`,
        method: 'GET',
      }),
    }),
    updateUser: build.mutation<User, { id: number; user: UpdateUserBody }>({
      query: args => ({
        url: `/user/${args.id}`,
        method: 'PATCH',
        body: args.user,
      }),
    }),
    getUserProfile: build.query<ProfileDto, { id: number }>({
      query: body => ({
        url: `/profile/${body.id}`,
        method: 'GET',
      }),
      extraOptions: {
        disableToastMessage: true,
      },
    }),
    updateUserProfile: build.mutation<ProfileDto, Omit<UserProfile, 'id'>>({
      query: body => ({
        url: `/profile`,
        method: 'PATCH',
        body,
      }),
    }),
    changePassword: build.mutation<
      any,
      { id: number; currentPassword: string; newPassword: string }
    >({
      query: args => ({
        url: `/user/change-password/${args.id}`,
        method: 'PATCH',
        body: {
          currentPassword: args.currentPassword,
          newPassword: args.newPassword,
        },
      }),
    }),
  }),
});

export const {
  useGetUsersByParamsQuery,
  useGetAllUsersQuery,
  useGetUserQuery,
  useAddUsersMutation,
  useAddUserMutation,
  useGetUserProfileQuery,
  useLazyGetUserQuery,
  useUpdateUserMutation,
  useUpdateUserProfileMutation,
  useChangePasswordMutation,
} = userApi;
