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
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
