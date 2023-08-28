import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userApi } from './services/user.service';
import { authApi } from './services';
import { resetPasswordApi } from './services/reset-password.service';
import resetPasswordSlice from './reducers/reset-password.store';
import { apiSlice } from './reducers/apiSlice';
import { chatApi } from './services/chat.service';

const rootReducer = combineReducers({
  resetPassword: resetPasswordSlice,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [resetPasswordApi.reducerPath]: resetPasswordApi.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(resetPasswordApi.middleware)
      .concat(apiSlice.middleware)
      .concat(userApi.middleware)
      .concat(chatApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
