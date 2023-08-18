import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, GoogleStrategy } from './strategies';
import { RedisModule } from 'src/redis';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, GoogleStrategy],
  imports: [
    UserModule,
    RedisModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || 'JWT_ACCESS_SECRET',
      signOptions: {
        expiresIn: '1m',
      },
    }),
  ],
})
export class AuthModule {}
