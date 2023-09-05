import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { development } from 'src/config';
// import { PermissionsModule } from './packages/permissions/permissions.module';

import {
  EmailConfirmationModule,
  UserModule,
  TimecardModule,
  BookingModule,
  RolesModule,
  AuthModule,
  RedisModule,
  ResetPasswordModule,
  UserProfileModule,
  FacilityModule,
  ChatModule,
  MessageModule,
  NotificationsConfigModule,
  BucketModule,
  NotificationModule,
  WebSocketModule,
  PermissionsModule,
} from './packages';
import { ChatGateway } from './packages/websocket/chat.gateway';
@Module({
  imports: [
    SequelizeModule.forRoot(development),
    RolesModule,
    UserModule,
    EmailConfirmationModule,
    AuthModule,
    RedisModule,
    ResetPasswordModule,
    TimecardModule,
    BookingModule,
    UserProfileModule,
    FacilityModule,
    ChatModule,
    MessageModule,
    NotificationsConfigModule,
    BucketModule,
    NotificationModule,
    WebSocketModule,
    PermissionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
