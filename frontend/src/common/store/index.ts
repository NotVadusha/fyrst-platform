import { combineReducers, configureStore } from '@reduxjs/toolkit';
import resetPasswordSlice from './slices/packages/reset-password/resetPasswordSlice';
import userSlice from './slices/packages/user/userSlice';
import { apiSlice } from './api/api';
import { chatApi } from './api/packages/chat/chatApi';
import messangerSlice from './slices/packages/messenger/messangerSlice';
import exportCSVSlice from './slices/packages/export-csv/exportCSVSlice';
import exportCalendarSlice from './slices/packages/export-calendar/exportCalendarSlice';
import meetingSlice from './slices/packages/meeting/meetingSlice';

const rootReducer = combineReducers({
  resetPassword: resetPasswordSlice,
  user: userSlice,
  messanger: messangerSlice,
  meeting: meetingSlice,
  exportCSV: exportCSVSlice,
  exportCalendar: exportCalendarSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
