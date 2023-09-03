import { User } from 'src/common/packages/user/types/models/User.model';
import { userRoles } from 'shared/packages/roles/userRoles';

export function hasRole(role: keyof typeof userRoles, user: User) {
  return userRoles[user.role.label as keyof typeof userRoles] >= userRoles[role];
}
