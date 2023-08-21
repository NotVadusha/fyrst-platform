import { createSlice } from '@reduxjs/toolkit';

const initialState = { test: [] };

const testSlice = createSlice({
  name: 'test',
  initialState: initialState,
  reducers: {
    // testAction() {},
  },
});

export const TestActions = testSlice.actions;
export const TestReducers = testSlice.reducer;
