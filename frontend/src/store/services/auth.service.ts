import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { customBaseQuery } from './helpers/customBaseQuery';
import { SignInBody, SignUpBody } from '../../../types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customBaseQuery,
  tagTypes: [],
  endpoints: build => ({
    registration: build.mutation({
      query: (body: SignUpBody) => ({
        url: '/auth/registration',
        method: 'POST',
        body,
      }),
    }),
    login: build.mutation({
      query: (body: SignInBody) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: '/auth/logout',
      }),
    }),
  }),
});
