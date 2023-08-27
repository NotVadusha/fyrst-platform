import { UpdateUserBody, UserDefaultResponse } from 'types/dto/UserDto';
import { UserProfile } from 'types/models/UserProfile';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from './helpers/baseQuery';

export const UserApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQuery,
  tagTypes: [],
  endpoints: build => ({
    getUser: build.mutation<UserDefaultResponse, { id: number }>({
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
