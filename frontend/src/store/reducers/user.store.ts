import { createSlice } from '@reduxjs/toolkit';
import { UserApi } from '../services/user.service/user.service';

const initialState = { test: [] };

const testSlice = createSlice({
  name: 'test',
  initialState: initialState,
  reducers: {},
});

export const TestActions = testSlice.actions;
export const TestReducers = testSlice.reducer;
