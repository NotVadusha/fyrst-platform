import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Message } from 'shared/socketEvents';
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
    upsertConversation(state, action: PayloadAction<Chat>) {
      if (!state.conversations.find(({ id }) => id === action.payload.id)) {
        state.conversations = [...state.conversations, action.payload];
        return;
      }

      state.conversations = state.conversations.map(conv =>
        conv.id === action.payload.id ? { conv, ...action.payload } : conv,
      );
    },
  },
});

export default messangerSlice.reducer;
export const { addMessage, setConversations, upsertConversation } = messangerSlice.actions;
