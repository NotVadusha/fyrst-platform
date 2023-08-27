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
    addUsers: builder.mutation<any, User[]>({
      query: users => {
        return {
          url: `/user/many`,
          method: 'POST',
          body: users,
        };
      },
    }),
  }),
});

export const { useGetUsersQuery, useAddUsersMutation } = userApi;
