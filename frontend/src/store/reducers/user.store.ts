import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from 'types/models/User';

const initialState: Partial<User> = {};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, action: PayloadAction<Partial<User> | undefined>) {
      state = { ...action.payload };
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
