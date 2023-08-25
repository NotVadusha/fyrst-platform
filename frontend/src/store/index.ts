import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TestReducers } from './reducers/test.store';
import { authApi } from './services';
import { apiSlice } from './services/apiSlice';

const rootReducer = combineReducers({
  test: TestReducers,
  [authApi.reducerPath]: authApi.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware).concat(apiSlice.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
