import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/Mail/mail.module';
import { EmailConfirmationService } from './emailConfirmation.service';

@Module({
  imports: [JwtModule, MailModule],
  providers: [EmailConfirmationService],
})
export class EmailConfirmationModule {}
