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
  NotificationConfigModule,
} from './packages';

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
    NotificationConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
