import { Module } from '@nestjs/common';
import { ResetPasswordController } from './reset-password.controller';
import { ResetPasswordService } from './reset-password.service';
import { UserModule } from 'src/user';
import { RedisModule } from 'src/redis';

@Module({
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService],
  imports: [UserModule, RedisModule],
})
export class ResetPasswordModule {}
