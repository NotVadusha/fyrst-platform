import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeDevelopmentConfig } from 'src/config';
import { EmailConfirmationModule } from './packages/email-confirmation/emailConfirmation.module';
import { UserModule } from './packages/user/user.module';
import { AuthModule } from './packages/auth/auth.module';
import { RedisModule } from './packages/redis/redis.module';
import { ResetPasswordModule } from './packages/reset-password/reset-password.module';
import { TimecardModule } from './packages/timecard/timecard.module';
import { RedisService } from './packages/redis/redis.service';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeDevelopmentConfig),
    UserModule,
    EmailConfirmationModule,
    AuthModule,
    RedisModule,
    ResetPasswordModule,
    TimecardModule,
  ],
  controllers: [],
  providers: [RedisService],
})
export class AppModule {}
