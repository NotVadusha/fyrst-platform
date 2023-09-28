import { User } from 'src/common/packages/user/types/models/User.model';

export type SignInResponseDto = {
  accessToken: string;
  refreshToken: string;
  userInfo: Partial<User>;
};
