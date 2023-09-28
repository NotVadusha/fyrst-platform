import { Module } from '@nestjs/common';
import { ResetPasswordController } from './reset-password.controller';
import { ResetPasswordService } from './reset-password.service';
import { RedisModule } from 'src/packages/redis/redis.module';
import { MailModule } from 'src/packages/mail/mail.module';
import { UserModule } from 'src/packages/user/user.module';

@Module({
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService],
  imports: [UserModule, RedisModule, MailModule],
})
export class ResetPasswordModule {}
