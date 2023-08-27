import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserState {
  id: number | null;
}

const initialState: UserState = { id: null };

const userSlice = createSlice({
  name: 'resetPassword',
  initialState: initialState,
  reducers: {
    setUserId(state, action: PayloadAction<number | null>) {
      state.id = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUserId } = userSlice.actions;
