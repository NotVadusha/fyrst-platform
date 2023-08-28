import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { apiSlice } from '../apiSlice';
import { Message } from 'shared/socketEvents';
import { UserDefaultResponse } from 'types/dto/UserDto';

interface NewChatPayload {
  name: string;
  members: string[];
}

export const chatApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getAllUserChats: build.query({
      query: () => `/chat`,
    }),
    createChat: build.mutation({
      query: (payload: NewChatPayload) => {
        return {
          url: '/chat',
          method: 'POST',
          body: payload,
        };
      },
    }),
    getChatById: build.query({
      query: (id: string) => `/chat/${id}`,
    }),
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

export const {
  useGetChatByIdQuery,
  useGetAllUserChatsQuery,
  useCreateChatMutation,
  useGetAllMessagesQuery,
  useSendNewMessageMutation,
} = chatApi;
