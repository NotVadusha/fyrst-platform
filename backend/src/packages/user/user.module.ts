import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Roles } from '../roles/entities/roles.entity';
import { RolesModule } from '../roles/roles.module';
@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
  imports: [SequelizeModule.forFeature([User, Roles]), RolesModule],
})
export class UserModule {}
