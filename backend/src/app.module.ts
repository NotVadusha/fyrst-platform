import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeDevelopmentConfig } from 'src/config';
import { EmailConfirmationModule } from './packages/email-confirmation/emailConfirmation.module';
import { UserModule } from './packages/user/user.module';
import { AuthModule } from './packages/auth/auth.module';
import { RedisModule } from './packages/redis/redis.module';
import { ResetPasswordModule } from './packages/reset-password/reset-password.module';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeDevelopmentConfig),
    UserModule,
    EmailConfirmationModule,
    AuthModule,
    RedisModule,
    ResetPasswordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
