import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeDevelopmentConfig } from 'src/config';
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

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeDevelopmentConfig),
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
  providers: [],
})
export class AppModule {}
