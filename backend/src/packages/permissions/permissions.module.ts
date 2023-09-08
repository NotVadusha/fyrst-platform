import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesModule } from '../roles/roles.module';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Permissions } from './entities/permissions.entity';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [SequelizeModule.forFeature([User, Permissions]), RolesModule],
  providers: [UserService, PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
