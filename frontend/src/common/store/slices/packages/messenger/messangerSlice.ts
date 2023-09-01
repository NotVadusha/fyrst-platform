import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Message, UpdateConversationPayload } from 'shared/socketEvents';
import { Chat } from 'shared/socketEvents';

type MessangerState = {
  conversations: Chat[];
  messages: Message[];

  onlineUsers: string[];
};

const initialState: MessangerState = {
  conversations: [],
  messages: [],
  onlineUsers: [],
};

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
    setOnlineUsers(state, action: PayloadAction<string[]>) {
      state.onlineUsers = action.payload;
    },
    addOnlineUser(state, action: PayloadAction<{ userId: string }>) {
      state.onlineUsers = state.onlineUsers.filter(id => id !== action.payload.userId);
    },
    removeOnlineUser(state, action: PayloadAction<{ userId: string }>) {
      state.onlineUsers = [action.payload.userId, ...state.onlineUsers];
    },
  },
});

export default messangerSlice.reducer;
export const {
  addMessage,
  addOnlineUser,
  removeOnlineUser,
  setOnlineUsers,
  setConversations,
  addConversation,
  updateConversation,
} = messangerSlice.actions;
