import { User } from 'src/common/types/models/User';

export type SignInResponseDto = {
  accessToken: string;
  refreshToken: string;
  userInfo: Partial<User>;
};
