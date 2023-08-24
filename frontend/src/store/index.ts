import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TestReducers } from './reducers/test.store';
import { authApi } from './services';
import { resetPasswordApi } from './services/reset-password.service';
import resetPasswordSlice from './reducers/reset-password.store';

const rootReducer = combineReducers({
  test: TestReducers,
  resetPassword: resetPasswordSlice,
  [authApi.reducerPath]: authApi.reducer,
  [resetPasswordApi.reducerPath]: resetPasswordApi.reducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(authApi.middleware).concat(resetPasswordApi.middleware),
  });
}

const store = setupStore()

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
