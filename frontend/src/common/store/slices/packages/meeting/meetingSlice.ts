import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MeetingMessage } from 'shared/socketEvents';

type MessangerState = {
  messages: MeetingMessage[];
};

const initialState: MessangerState = {
  messages: [],
};

const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<MeetingMessage>) {
      if (state.messages.some(message => message.id === action.payload.id)) return;
      state.messages = [...state.messages, action.payload];
    },
  },
});

export default meetingSlice.reducer;
export const { addMessage } = meetingSlice.actions;
