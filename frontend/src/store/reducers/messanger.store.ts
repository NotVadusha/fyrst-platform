import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Message, UpdateConversationPayload } from 'shared/socketEvents';
import { useGetChatByIdQuery } from './chat/chatApi';
import { Chat } from 'shared/socketEvents';

type MessangerState = {
  conversations: Chat[];
  messages: Message[];
};

const initialState: MessangerState = {
  conversations: [],
  messages: [],
};

// export const getChatById = createAsyncThunk('message/getByChatId', async (chatId: string) => {
//   const { data } = await useGetChatByIdQuery(chatId);
//   console.log('here', data);
//   return data;
// });

const messangerSlice = createSlice({
  name: 'messanger',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<Message>) {
      state.messages = [...state.messages, action.payload];
    },
    setConversations(state, action: PayloadAction<Chat[]>) {
      state.conversations = action.payload;
    },
    addConversation(state, action: PayloadAction<Chat>) {
      state.conversations = [...state.conversations, action.payload];
    },
    updateConversation(state, action: PayloadAction<UpdateConversationPayload>) {
      state.conversations = state.conversations.map(conv =>
        conv.id === action.payload.chatId ? { ...conv, messages: [action.payload.message] } : conv,
      );
    },
  },
});

export default messangerSlice.reducer;
export const { addMessage, setConversations, addConversation, updateConversation } =
  messangerSlice.actions;
