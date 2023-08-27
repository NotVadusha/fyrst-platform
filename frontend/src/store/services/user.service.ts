import {
  GetUser,
  GetUserProfile,
  UpdateUserBody,
  UpdateUserProfileBody,
  UserDefaultResponse,
} from 'types/user';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from './helpers/baseQuery';

export const UserApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: build => ({
    getUser: build.mutation<UserDefaultResponse, GetUser>({
      query: body => ({
        url: `/user/${body.id}`,
        method: 'GET',
        body,
      }),
    }),
    updateUser: build.mutation<UserDefaultResponse, UpdateUserBody>({
      query: body => ({
        url: `/user/${body.id}`,
        method: 'PATCH',
        body,
      }),
    }),
    getUserProfile: build.mutation<UserDefaultResponse, GetUserProfile>({
      query: body => ({
        url: `/profile/${body.id}`,
        method: 'GET',
        body,
      }),
    }),
    updateUserProfile: build.mutation<UserDefaultResponse, UpdateUserProfileBody>({
      query: body => ({
        url: `/profile/${body.id}`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});
