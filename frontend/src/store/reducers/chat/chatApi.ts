import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { apiSlice } from '../apiSlice';
import { Message } from 'shared/socketEvents';
import { UserDefaultResponse } from 'types/dto/UserDto';
import { Chat } from 'shared/socketEvents';

interface NewChatPayload {
  name: string;
  members: string[];
}

export const chatApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getAllUserChats: build.query({
      query: () => `/chat`,
    }),
    searchChats: build.query({
      query: (name: string) => `/chat/search?name=${name}`,
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
    getChatById: build.query<Chat, string>({
      query: (id: string) => `/chat/${id}`,
    }),
    getAllMessages: build.query<Chat, { chatId: string }>({
      query: ({ chatId }) => `/chat/${chatId}`,
    }),
    sendNewMessage: build.mutation<
      any,
      { chatId: string; message: Omit<Message, 'id' | 'chatId' | 'userId' | 'time'> }
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
  useSearchChatsQuery,
  useGetChatByIdQuery,
  useGetAllUserChatsQuery,
  useCreateChatMutation,
  useGetAllMessagesQuery,
  useSendNewMessageMutation,
} = chatApi;
