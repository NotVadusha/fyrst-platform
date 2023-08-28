import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { customBaseQuery } from './helpers/customBaseQuery';
import { Message } from 'shared/socketEvents';

export const chatApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customBaseQuery,
  tagTypes: [],
  endpoints: build => ({
    getAllMessages: build.query<Message, { chatId: string }>({
      query: ({ chatId }) => `/chat/${chatId}`,
    }),
  }),
});

export const { useGetAllMessagesQuery } = chatApi;
