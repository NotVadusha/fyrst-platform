import { Global, Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';
import { Roles } from '../roles/entities/roles.entity';
import { Permissions } from './entities/permissions.entity';
import { PermissionsService } from './permissions.service';
import { BucketModule } from '../bucket/bucket.module';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([User, Permissions]), BucketModule],
  providers: [UserService, PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
