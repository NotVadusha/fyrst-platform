import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { development } from 'src/config';

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
  NotificationConfigModule,
} from './packages';
import { AppGateway } from './app.gateway';
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
    NotificationConfigModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
