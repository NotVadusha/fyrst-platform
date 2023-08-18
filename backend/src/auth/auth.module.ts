import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy, GoogleStrategy } from './strategies';
import { RedisModule } from 'src/redis';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy, GoogleStrategy],
  imports: [UserModule, RedisModule, JwtModule.register({})],
})
export class AuthModule {}
