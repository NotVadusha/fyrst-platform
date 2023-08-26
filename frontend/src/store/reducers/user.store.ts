import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserApi } from '../services/user.service/user.service';
import { UpdateUserBody, UpdateUserProfileBody } from 'types/user';

const [requestGetUser] = UserApi.useGetUserMutation();
const [getProfile] = UserApi.useGetUserProfileMutation();
const [updateUser] = UserApi.useUpdateUserMutation();
const [updateUserProfile] = UserApi.useUpdateUserProfileMutation();
const accessToken = localStorage.getItem('accessToken');
const initialState = {};

const userSlice = createSlice({
  name: 'userStore',
  initialState: initialState,
  reducers: {
    getUser(state, action: PayloadAction<number>) {
      const body = { id: action.payload };
      return requestGetUser(body);
    },
    getUserProfile(state, action: PayloadAction<number>) {
      const body = { id: action.payload };
      return getProfile(body);
    },
  },
});

export const UserActions = userSlice.actions;
export const UserReducers = userSlice.reducer;
