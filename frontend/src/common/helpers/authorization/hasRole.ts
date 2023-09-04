import { User } from 'src/common/packages/user/types/models/User.model';
import { userRoles } from 'shared/packages/roles/userRoles';

export function hasRole(role: keyof typeof userRoles, user: User, strict: boolean) {
  if (strict) {
    console.log(user.role.label);
    console.log(userRoles[user.role.label as keyof typeof userRoles]);
    console.log(userRoles[role]);
    console.log(userRoles[user.role.label as keyof typeof userRoles] === userRoles[role]);
    return userRoles[user.role.label as keyof typeof userRoles] === userRoles[role];
  }

  return userRoles[user.role.label as keyof typeof userRoles] >= userRoles[role];
}
