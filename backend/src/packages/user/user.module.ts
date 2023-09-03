import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Roles } from '../roles/entities/roles.entity';
import { RolesModule } from '../roles/roles.module';
import { Notification } from '../notification/entities/notification.entity';
import { NotificationModule } from '../notification/notification.module';
import { NotificationService } from '../notification/notification.service';
import { NotificationGateway } from '../websocket/notification.gateway';
@Module({
  providers: [UserService, NotificationService, NotificationGateway],
  controllers: [UserController],
  exports: [UserService],
  imports: [
    SequelizeModule.forFeature([User, Roles, Notification]),
    RolesModule,
    NotificationModule,
  ],
})
export class UserModule {}
