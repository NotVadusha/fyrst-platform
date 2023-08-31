import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ResetPasswordState {
  email: string | null;
}

const initialState: ResetPasswordState = { email: null };

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState: initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string | null>) {
      state.email = action.payload;
    },
  },
});

export default resetPasswordSlice.reducer;
export const { setEmail } = resetPasswordSlice.actions;
