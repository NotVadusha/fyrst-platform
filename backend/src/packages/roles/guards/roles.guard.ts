import { CanActivate, ExecutionContext, Injectable, mixin } from '@nestjs/common';
import { UserService } from 'src/packages/user/user.service';
import { Request } from 'express';
import { userRoles } from 'shared/packages/roles/userRoles';

export function RoleGuard(role: keyof typeof userRoles) {
  @Injectable()
  class RolesGuardMixin implements CanActivate {
    constructor(readonly userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const authorizationHeader = request.headers['authorization'];

      if (!authorizationHeader) {
        return false;
      }

      const jwt = authorizationHeader.split(' ')[1];

      const user = await this.userService.findByJwt(jwt);
      return userRoles[user.role.label] >= userRoles[role];
    }
  }

  const guard = mixin(RolesGuardMixin);
  return guard;
}
