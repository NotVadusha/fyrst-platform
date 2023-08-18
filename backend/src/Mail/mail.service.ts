import { Configuration, EmailsApi } from '@elasticemail/elasticemail-client-ts-axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  private emailsApi: EmailsApi;

  constructor() {
    this.emailsApi = new EmailsApi(new Configuration({ apiKey: process.env.MAIL_API_KEY }));
  }

  async sendEmail(recepient: string, subject: string, content: string) {
    try {
      const response = await this.emailsApi.emailsPost({
        Recipients: [{ Email: recepient }],
        Content: {
          From: `Ian Grytsov <${process.env.MAIL_DOMAIN}>`,
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

      console.log('Email sent successfully.');
      console.log(response.data);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
