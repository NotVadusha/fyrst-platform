import { User } from 'types/models/User';

export type SignInResponseDto = {
  accessToken: string;
  refreshToken: string;
  userInfo: Partial<User>;
};
