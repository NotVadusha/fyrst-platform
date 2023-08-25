import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TestReducers } from './reducers/test.store';
import { userApi } from './services/user.service';
import { authApi } from './services';

const rootReducer = combineReducers({
  test: TestReducers,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
