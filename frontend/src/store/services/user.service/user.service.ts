import { GetUser, UpdateUserBody, UserDefaultResponse } from 'types/user';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { customBaseQuery } from '../helpers/customBaseQuery';

export const UserApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customBaseQuery,
  tagTypes: [],
  endpoints: build => ({
    getUser: build.mutation<UserDefaultResponse, GetUser>({
      query: body => ({
        url: `/user/${body.id}`,
        method: 'POST',
        body,
      }),
    }),
    update: build.mutation<UserDefaultResponse, UpdateUserBody>({
      query: body => ({
        url: '/auth/login',
        method: 'GET',
        body,
      }),
    }),
  }),
});
