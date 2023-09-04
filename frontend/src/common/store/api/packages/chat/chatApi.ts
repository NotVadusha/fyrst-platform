import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { apiSlice } from '../../api';
import { Message } from 'shared/socketEvents';
import { Chat } from 'shared/socketEvents';

interface NewChatPayload {
  name: string;
  members: string[];
}

export interface MessageFilters {
  messageContent?: string;
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
    getMessagesByParams: build.query<Message[], { chatId: string; filters: MessageFilters }>({
      query: ({ chatId, filters }) => {
        const params = new URLSearchParams();

        Object.keys(filters).forEach(key =>
          params.set(key, String(filters[key as keyof MessageFilters])),
        );

        const result = `/chat/${chatId}/message?` + params;

        return result;
      },
    }),
    getMessagesWithMedia: build.query<Message[], { chatId: string }>({
      query: ({ chatId }) => `/chat/${chatId}/message/media`,
    }),
    uploadAttachment: build.mutation<string, { attachment: string }>({
      query: ({ attachment }) => {
        return {
          method: 'POST',
          url: `/chat/upload`,
          body: { attachment },
          responseHandler: response => response.text(),
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
  useGetMessagesByParamsQuery,
  useUploadAttachmentMutation,
  useGetMessagesWithMediaQuery,
} = chatApi;
