import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { customBaseQuery } from './helpers/customBaseQuery';
import { ForgotBody, MessageResponse, ResetBody } from '../../../types/authentication';

export const resetPasswordApi = createApi({
  reducerPath: 'resetPasswordApi',
  baseQuery: customBaseQuery,
  tagTypes: [],
  endpoints: build => ({
    forgot: build.query<MessageResponse, ForgotBody>({
      query: body => ({
        url: '/reset-password',
        method: 'POST',
        body,
      }),
    }),
    reset: build.mutation<MessageResponse, ResetBody>({
      query: body => ({
        url: '/reset-password/new-password',
        method: 'POST',
        body,
      }),
    }),
  }),
});
