import { UpdateUserBody, UserDefaultResponse } from 'types/dto/UserDto';
import { UserProfile } from 'types/models/UserProfile';
import { UserFilters } from 'types/UserFilters';
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
    getAllUsers: build.query<UserDefaultResponse[], void>({
      query: () => '/user/many',
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
    getUser: build.mutation<UserDefaultResponse, { id: number }>({
      query: body => ({
        url: `/user/${body.id}`,
        method: 'GET',
        body,
      }),
    }),
    updateUser: build.mutation<
      UserDefaultResponse,
      { id: UserDefaultResponse['id']; user: UpdateUserBody }
    >({
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
  }),
});

export const {
  useGetUsersByParamsQuery,
  useGetAllUsersQuery,
  useGetUserMutation,
  useAddUsersMutation,
  useAddUserMutation,
  useGetUserProfileMutation,
  useLazyGetUsersByParamsQuery,
  useUpdateUserMutation,
  useUpdateUserProfileMutation,
} = userApi;
