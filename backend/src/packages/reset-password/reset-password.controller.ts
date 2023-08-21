import { Controller, Post, Get, Body } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { NewPasswordDto } from './dto/new-password.dto';

@Controller('reset-password')
export class ResetPasswordController {
  constructor(private resetPasswordService: ResetPasswordService) {}

  @Post()
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.resetPasswordService.resetPassword(resetPasswordDto);
  }

  @Post('new-password')
  async updatePassword(@Body() newPasswordDto: NewPasswordDto) {
    return await this.resetPasswordService.updatePassword(newPasswordDto);
  }
}
