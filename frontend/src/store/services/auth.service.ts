import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from './helpers/baseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: build => ({
    registration: build.mutation({
      query: body => ({
        url: '/auth/registration',
        method: 'POST',
        body,
      }),
    }),
    login: build.query({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
});
