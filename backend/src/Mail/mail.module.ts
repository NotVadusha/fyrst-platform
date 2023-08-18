import { Configuration, EmailsApi } from '@elasticemail/elasticemail-client-ts-axios';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  providers: [
    {
      provide: EmailsApi,
      useValue: new EmailsApi(new Configuration({ apiKey: process.env.MAIL_API_KEY })),
    },
    MailService,
  ],
  exports: [MailService],
})
export class MailModule {}
