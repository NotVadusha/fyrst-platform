import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Message } from 'shared/socketEvents';
import { useGetChatByIdQuery } from './chat/chatApi';
import { Chat } from 'types/dto/Chat';

const initialState: Chat = {
  messages: [],
  members: [],
};

// export const getChatById = createAsyncThunk('message/getByChatId', async (chatId: string) => {
//   const { data } = await useGetChatByIdQuery(chatId);
//   console.log('here', data);
//   return data;
// });

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<Message>) {
      state.messages = [...state.messages, action.payload];
    },
  },
  // extraReducers: builder => {
  //   builder.addCase(getChatById.fulfilled, (state, action) => {
  //     console.log('reduces');
  //     if (!action.payload) return;
  //     state = action.payload;
  //   });
  // },
});

export default messageSlice.reducer;
export const { addMessage } = messageSlice.actions;
