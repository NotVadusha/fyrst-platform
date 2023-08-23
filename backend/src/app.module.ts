import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeDevelopmentConfig } from 'src/config';
import {
  EmailConfirmationModule,
  UserModule,
  TimecardModule,
  BookingModule,
  RolesModule,
  UserProfileModule,
  AuthModule,
  RedisModule,
  ResetPasswordModule,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
