import { configureStore } from '@reduxjs/toolkit';
import { TestReducers } from './reducers/test.store';
import { userApi } from './services/user.service';

const store = configureStore({
  reducer: { test: TestReducers, [userApi.reducerPath]: userApi.reducer },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
