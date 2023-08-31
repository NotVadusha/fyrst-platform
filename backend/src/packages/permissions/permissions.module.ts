import { Global, Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';
import { Roles } from '../roles/entities/roles.entity';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService],
})
export class PermissionsModule {}
