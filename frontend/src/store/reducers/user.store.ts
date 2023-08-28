import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from 'types/models/User';

const initialState: Partial<User> = {
  id: undefined,
  first_name: undefined,
  last_name: undefined,
  city: undefined,
  phone_number: undefined,
  birthdate: undefined,
  email: undefined,
  role_id: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser(state, action: PayloadAction<Partial<User> | undefined>) {
      console.log(action.payload);
      state.id = action.payload?.id;
      state.first_name = action.payload?.first_name;
      state.last_name = action.payload?.last_name;
      state.city = action.payload?.city;
      state.phone_number = action.payload?.phone_number;
      state.birthdate = action.payload?.birthdate;
      state.email = action.payload?.email;
      state.role_id = action.payload?.role_id;
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
