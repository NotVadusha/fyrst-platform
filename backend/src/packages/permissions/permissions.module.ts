import { Global, Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';
import { Roles } from '../roles/entities/roles.entity';
import { Permissions } from './entities/permissions.entity';
import { PermissionsService } from './permissions.service';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([User, Permissions])],
  providers: [UserService, PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
