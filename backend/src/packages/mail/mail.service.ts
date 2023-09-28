import { EmailsApi } from '@elasticemail/elasticemail-client-ts-axios';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  constructor(private readonly emailsApi: EmailsApi) {}

  async sendEmail(recepient: string, subject: string, content: string) {
    try {
      await this.emailsApi.emailsPost({
        Recipients: [{ Email: recepient }],
        Content: {
          From: `Fyrst platform <${process.env.MAIL_DOMAIN}>`,
          Subject: subject,
          Body: [
            {
              ContentType: 'HTML',
              Charset: 'utf-8',
              Content: content,
            },
          ],
        },
      });

      this.logger.log('Email sent successfully.');
    } catch (error) {
      this.logger.error('Error sending email:', error);
      throw new InternalServerErrorException('Failed to sent email');
    }
  }
}
