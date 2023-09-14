import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Message, UpdateConversationPayload } from 'shared/socketEvents';
import { Chat } from 'shared/socketEvents';
import { RootState } from 'src/common/store';

type MessangerState = {
  conversations: Chat[];
  messages: Message[];
  onlineUsers: number[];
  currentChat?: Chat;
  attachment?: string;
  attachmentFile?: File;
};

const initialState: MessangerState = {
  conversations: [],
  messages: [],
  onlineUsers: [],
  currentChat: undefined,
  attachment: undefined,
};

const messangerSlice = createSlice({
  name: 'messanger',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<Message>) {
      state.messages = [...state.messages, action.payload];
    },
    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },
    setCurrentChat(state, action: PayloadAction<Chat>) {
      state.currentChat = action.payload;
    },
    setConversations(state, action: PayloadAction<Chat[]>) {
      state.conversations = action.payload;
    },
    addConversation(state, action: PayloadAction<Chat>) {
      if (state.conversations.some(conv => conv.id === action.payload.id)) return;
      state.conversations = [...state.conversations, action.payload];
    },
    updateConversation(state, action: PayloadAction<UpdateConversationPayload>) {
      const updatedChatIndex = state.conversations.findIndex(
        conv => conv.id === action.payload.chatId,
      );

      if (updatedChatIndex !== -1) {
        const updatedChat = {
          ...state.conversations[updatedChatIndex],
          messages: [action.payload.message],
        };

        state.conversations.splice(updatedChatIndex, 1);

        state.conversations.unshift(updatedChat);
      }
    },
    setOnlineUsers(state, action: PayloadAction<number[]>) {
      state.onlineUsers = action.payload;
    },
    addOnlineUser(state, action: PayloadAction<{ userId: number }>) {
      state.onlineUsers = [action.payload.userId, ...state.onlineUsers];
    },
    removeOnlineUser(state, action: PayloadAction<{ userId: number }>) {
      state.onlineUsers = state.onlineUsers.filter(id => id !== action.payload.userId);
    },
    setAttachmentPath(state, action: PayloadAction<string | undefined>) {
      state.attachment = action.payload;
    },
    setAttachmentFile(state, action: PayloadAction<File | undefined>) {
      state.attachmentFile = action.payload;
    },
  },
});

export default messangerSlice.reducer;
export const {
  addMessage,
  setMessages,
  addOnlineUser,
  removeOnlineUser,
  setOnlineUsers,
  setConversations,
  addConversation,
  updateConversation,
  setCurrentChat,
  setAttachmentPath,
  setAttachmentFile,
} = messangerSlice.actions;

export const getConversationsByUserNames = (state: RootState, names: string[]) =>
  state.messanger.conversations.filter(conv => names.every(sub => conv.name.includes(sub)));
