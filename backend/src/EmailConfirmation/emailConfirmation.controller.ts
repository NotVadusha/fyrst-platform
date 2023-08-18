import { BadRequestException, Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { EmailConfirmationService } from './emailConfirmation.service';

@Controller('email-confirmation')
export class EmailConfirmationController {
  private readonly logger = new Logger(EmailConfirmationController.name);
  constructor(private readonly emailConfirmationService: EmailConfirmationService) {}

  @Get('confirm')
  async confirmEmail(@Query('token') token: string) {
    try {
      const isConfirmed = await this.emailConfirmationService.confirmEmail(token);

      if (isConfirmed) {
        return 'Email confirmed';
      } else {
        return 'Email not confirmed';
      }
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
