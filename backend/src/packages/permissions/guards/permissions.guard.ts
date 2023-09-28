import { CanActivate, ExecutionContext, Injectable, mixin } from '@nestjs/common';
import { UserService } from 'src/packages/user/user.service';
import { Permissions } from '../entities/permissions.entity';
import { InferCreationAttributes } from 'sequelize';
import { Request } from 'express';

export function PermissionsGuard(permissions: (keyof InferCreationAttributes<Permissions>)[]) {
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
      return permissions.every(key => user.permissions[key]);
    }
  }

  const guard = mixin(PermissionsGuardMixin);
  return guard;
}
