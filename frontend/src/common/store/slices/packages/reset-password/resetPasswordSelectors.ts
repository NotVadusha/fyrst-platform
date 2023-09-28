import { RootState } from '../../..';

export const selectResetPasswordEmail = (state: RootState) => state.resetPassword.email;
