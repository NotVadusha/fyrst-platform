import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, GoogleStrategy } from './strategies';
import { RedisModule } from 'src/redis';
import { EmailConfirmationModule } from 'src/EmailConfirmation/emailConfirmation.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, GoogleStrategy],
  imports: [
    UserModule,
    RedisModule,
    EmailConfirmationModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || 'JWT_ACCESS_SECRET',
      signOptions: {
        expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME || '1m',
      },
    }),
  ],
})
export class AuthModule {}
