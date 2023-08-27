import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { customBaseQuery } from './helpers/customBaseQuery';
import {
  MessageResponse,
  SignInBody,
  SignUpBody,
  TokenResponse,
} from '../../../types/authentication';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customBaseQuery,
  tagTypes: [],
  endpoints: build => ({
    registration: build.mutation<MessageResponse, SignUpBody>({
      query: body => ({
        url: '/auth/registration',
        method: 'POST',
        body,
      }),
    }),
    login: build.mutation<TokenResponse, SignInBody>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    logout: build.mutation<undefined, undefined>({
      query: () => ({
        url: '/auth/logout',
      }),
    }),
  }),
});
