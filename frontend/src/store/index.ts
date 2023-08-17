import { configureStore } from '@reduxjs/toolkit';
import { TestReducers } from './reducers/test.store';
const store = configureStore({
  reducer: { test: TestReducers },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
