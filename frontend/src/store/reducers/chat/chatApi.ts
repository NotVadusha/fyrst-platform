import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { apiSlice } from '../apiSlice';
import { Message } from 'shared/socketEvents';
import { UserDefaultResponse } from 'types/dto/UserDto';

export const chatApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getAllMessages: build.query<
      { messages: Message[]; members: UserDefaultResponse[] },
      { chatId: string }
    >({
      query: ({ chatId }) => `/chat/${chatId}`,
    }),
    sendNewMessage: build.mutation<
      any,
      { chatId: string; message: Omit<Message, 'id' | 'chatId' | 'userId'> }
    >({
      query: ({ chatId, message }) => {
        return {
          method: 'POST',
          url: `/chat/${chatId}/message`,
          body: message,
        };
      },
    }),
  }),
});

export const { useGetAllMessagesQuery, useSendNewMessageMutation } = chatApi;
