import { RootState } from '../../..';

export const selectUserId = (state: RootState) => state.user.id;
export const selectUser = (state: RootState) => state.user;
