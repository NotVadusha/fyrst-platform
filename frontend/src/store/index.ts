import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userApi } from './reducers/user.service';
import resetPasswordSlice from './reducers/reset-password.store';
import userSlice from './reducers/user.store';
import { apiSlice } from './reducers/apiSlice';

const rootReducer = combineReducers({
  resetPassword: resetPasswordSlice,
  user: userSlice,
  [userApi.reducerPath]: userApi.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(userApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
