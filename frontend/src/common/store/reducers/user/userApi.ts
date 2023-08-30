import { UpdateUserBody, UserDefaultResponse } from 'src/common/packages/user/types/dto/UserDto';
import { UserProfile } from 'src/common/packages/user/common/user-profile/types/models/UserProfile.model';
import { UserFilters } from 'src/common/packages/user/common/user-filters/types/models/UserFilters.model';
import { apiSlice } from '../apiSlice';

export interface getUsersQueryParams {
  currentPage: number;
  filters: UserFilters;
}

interface getUsersPayload {
  users: UserDefaultResponse[];
  totalCount: number;
}

export const userApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getUsers: build.query<getUsersPayload, getUsersQueryParams>({
      query: args => {
        const params = new URLSearchParams();

        Object.keys(args.filters).forEach(key =>
          params.set(key, String(args.filters[key as keyof UserFilters])),
        );

        const result = `/user?currentPage=${args.currentPage}&` + params;

        return result;
      },
    }),
    addUsers: build.mutation<UserDefaultResponse[], UserDefaultResponse[]>({
      query: users => {
        return {
          url: `/user/many`,
          method: 'POST',
          body: users,
        };
      },
    }),
    addUser: build.mutation<UserDefaultResponse, Omit<UserDefaultResponse, 'id' | 'is_confirmed'>>({
      query: user => {
        return {
          url: '/user',
          method: 'POST',
          body: user,
        };
      },
    }),
    getUser: build.query<UserDefaultResponse, number>({
      query(id) {
        return `/user/${id}`;
      },
    }),
    updateUser: build.mutation<UserDefaultResponse, { id: number; user: UpdateUserBody }>({
      query: args => ({
        url: `/user/${args.id}`,
        method: 'PATCH',
        body: args.user,
      }),
    }),
    getUserProfile: build.mutation<UserDefaultResponse, { id: number }>({
      query: body => ({
        url: `/profile/${body.id}`,
        method: 'GET',
        body,
      }),
    }),
    updateUserProfile: build.mutation<UserDefaultResponse, UserProfile>({
      query: body => ({
        url: `/profile/${body.id}`,
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
  useGetUsersQuery,
  useGetUserQuery,
  useAddUsersMutation,
  useAddUserMutation,
  useGetUserProfileMutation,
  useLazyGetUsersQuery,
  useLazyGetUserQuery,
  useUpdateUserMutation,
  useUpdateUserProfileMutation,
  useChangePasswordMutation,
} = userApi;
