import { combineReducers, configureStore } from '@reduxjs/toolkit';
import resetPasswordSlice from './reducers/reset-password.store';
import userSlice from './reducers/user.store';
import { apiSlice } from './reducers/apiSlice';
import { chatApi } from './reducers/chat/chatApi';
import messangerSlice from './reducers/messanger.store';

const rootReducer = combineReducers({
  resetPassword: resetPasswordSlice,
  user: userSlice,
  messanger: messangerSlice,
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
