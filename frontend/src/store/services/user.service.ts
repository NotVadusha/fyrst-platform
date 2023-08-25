import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from 'src/routes/routes';
import { User } from 'types';

export interface getUsersQueryParams {
  currentPage: number;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: builder => ({
    getUsers: builder.query<User[], getUsersQueryParams>({
      query: params => `/user?currentPage=${params.currentPage}`,
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
