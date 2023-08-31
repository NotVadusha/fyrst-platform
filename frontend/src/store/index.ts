import { combineReducers, configureStore } from '@reduxjs/toolkit';
import resetPasswordSlice from './reducers/reset-password.store';
import userSlice from './reducers/user.store';
import { apiSlice } from './reducers/apiSlice';
import csvSlice from './reducers/csv/csvSlice';

const rootReducer = combineReducers({
  resetPassword: resetPasswordSlice,
  user: userSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
  csv: csvSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
