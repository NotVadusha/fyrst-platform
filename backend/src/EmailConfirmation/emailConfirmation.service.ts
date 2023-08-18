import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/Mail/mail.service';

import { Inject } from '@nestjs/common';

export class EmailConfirmationService {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async sendVerificationLink(email: string) {
    const payload = { email: email };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
      expiresIn: process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME,
    });

    const url = `${process.env.EMAIL_CONFIRMATION_URL}?token=${token}`;

    const subject = 'Email confirmation';
    const content = `Welcome to Fyrst. To confirm the email address, click here: ${url}`;

    try {
      await this.mailService.sendEmail(email, subject, content);
      console.log('Email confirmation link sent successfully.');
    } catch (error) {
      console.error('Error sending email confirmation link:', error);
      throw error;
    }
  }

  async confirmEmail(token: string): Promise<boolean> {
    try {
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
      });

      console.log(decodedToken);
      return true;
    } catch (error) {
      return false;
    }
  }
}
