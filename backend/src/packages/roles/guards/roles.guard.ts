import { CanActivate, ExecutionContext, Injectable, mixin } from '@nestjs/common';
import { UserService } from 'src/packages/user/user.service';
import { InferCreationAttributes } from 'sequelize';
import { Request } from 'express';

const userRoles = {
  WORKER: 1,
  FACILITY_MANAGER: 2,
  PLATFORM_ADMIN: 3,
};

export function RoleGuard(role: keyof typeof userRoles) {
  @Injectable()
  class PermissionsGuardMixin implements CanActivate {
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

  const guard = mixin(PermissionsGuardMixin);
  return guard;
}
