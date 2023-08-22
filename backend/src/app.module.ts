import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeDevelopmentConfig } from 'src/config/sequelize/sequelize.config';
import {
  EmailConfirmationModule,
  UserModule,
  TimecardModule,
  BookingModule,
  RolesModule,
  AuthModule,
  RedisModule,
  ResetPasswordModule,
} from './packages';
import { RedisService } from './packages/redis/redis.service';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
