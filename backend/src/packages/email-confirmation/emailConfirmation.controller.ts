import { BadRequestException, Controller, Get, Logger, Param, Query, Res } from '@nestjs/common';
import { EmailConfirmationService } from './emailConfirmation.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Email confirmation endpoints')
@Controller('email-confirmation')
export class EmailConfirmationController {
  private readonly logger = new Logger(EmailConfirmationController.name);
  constructor(private readonly emailConfirmationService: EmailConfirmationService) {}

  @Get('confirm')
  async confirmEmail(@Query('token') token: string, @Res() res: Response) {
    try {
      const isConfirmed = await this.emailConfirmationService.confirmEmail(token);

      res.redirect(process.env.LOGIN_URL.toString());
    } catch (error) {
      this.logger.error('Failed to confirm email', error);
      throw new BadRequestException('Failed to confirm email');
    }
  }
  @Get('send-link/:email')
  async sendLink(@Param('email') email: string) {
    try {
      await this.emailConfirmationService.sendVerificationLink(email);
      return { message: 'Verification link sent successfully.' };
    } catch (error) {
      this.logger.error('Failed to send link', error);
      throw new BadRequestException('Failed to send link');
    }
  }
}
