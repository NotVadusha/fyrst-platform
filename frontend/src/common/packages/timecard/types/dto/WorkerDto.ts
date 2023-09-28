import { User } from 'src/common/packages/user/types/models/User.model';

export interface WorkerDto {
  employee: Partial<User>;
}
