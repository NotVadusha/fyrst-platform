import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common';
import { EmailConfirmationService } from './emailConfirmation.service';

@Controller('email-confirmation')
export class EmailConfirmationController {
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
      throw new BadRequestException('Failed to confirm email');
    }
  }
  @Get('send-link/:email')
  async sendLink(@Param('email') email: string) {
    try {
      await this.emailConfirmationService.sendVerificationLink(email);
      return { message: 'Verification link sent successfully.' };
    } catch (error) {
      throw new BadRequestException('Failed to send link');
    }
  }
}
