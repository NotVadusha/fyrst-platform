import { createApi } from '@reduxjs/toolkit/query/react';
import { User } from 'types';
import { UserFilters } from 'types/UserFilters';
import { baseQuery } from './helpers/baseQuery';

export interface getUsersQueryParams {
  currentPage: number;
  filters: UserFilters;
}

interface getUsersPayload {
  users: User[];
  totalCount: number;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQuery,
  endpoints: builder => ({
    getUsers: builder.query<getUsersPayload, getUsersQueryParams>({
      query: args => {
        const params = new URLSearchParams();

        Object.keys(args.filters).forEach(key =>
          params.set(key, String(args.filters[key as keyof UserFilters])),
        );

        const result = `/user?currentPage=${args.currentPage}&` + params;

        return result;
      },
    }),
    addUsers: builder.mutation<User[], User[]>({
      query: users => {
        return {
          url: `/user/many`,
          method: 'POST',
          body: users,
        };
      },
    }),
    addUser: builder.mutation<User, Omit<User, 'id' | 'is_confirmed'>>({
      query: user => {
        return {
          url: '/user',
          method: 'POST',
          body: user,
        };
      },
    }),
    editUser: builder.mutation<User, { user: Omit<User, 'id' | 'is_confirmed'>; id: User['id'] }>({
      query: args => {
        return {
          url: `/user/${args.id}`,
          method: 'PATCH',
          body: args.user,
        };
      },
    }),
  }),
});

export const { useGetUsersQuery, useAddUsersMutation, useAddUserMutation, useEditUserMutation } =
  userApi;
