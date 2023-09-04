import { User } from 'src/common/packages/user/types/models/User.model';
import { Permissions } from 'src/common/packages/permissions/types/Permissions';

export function hasPermissions(permissions: (keyof Omit<Permissions, 'userId'>)[], user: User) {
  return permissions.every(key => {
    return user.permissions && user.permissions[key];
  });
}
