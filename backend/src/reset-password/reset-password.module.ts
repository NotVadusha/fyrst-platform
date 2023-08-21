import { Module } from '@nestjs/common';
import { ResetPasswordController } from './reset-password.controller';
import { ResetPasswordService } from './reset-password.service';
import { UserModule } from 'src/user/user.module';
import { RedisModule } from 'src/redis';
import { MailModule } from 'src/Mail/mail.module';

@Module({
  controllers: [ResetPasswordController],
  providers: [ResetPasswordService],
  imports: [UserModule, RedisModule, MailModule],
})
export class ResetPasswordModule {}
