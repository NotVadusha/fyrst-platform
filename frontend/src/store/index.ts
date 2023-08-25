import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TestReducers } from './reducers/test.store';
import { authApi } from './services';

const rootReducer = combineReducers({
  test: TestReducers,
  [authApi.reducerPath]: authApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
