import { Controller, Post, Get, Body, HttpCode } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { NewPasswordDto } from './dto/new-password.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageResponse } from 'src/helpers/responceClasses';

@ApiTags('Reset password endpoints')
@Controller('reset-password')
export class ResetPasswordController {
  constructor(private resetPasswordService: ResetPasswordService) {}

  @ApiOperation({ summary: 'Sending email to reset password' })
  @ApiResponse({ status: 200, type: MessageResponse })
  @HttpCode(200)
  @Post()
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.resetPasswordService.resetPassword(resetPasswordDto);
  }

  @ApiOperation({ summary: 'Setting a new password' })
  @ApiResponse({ status: 200, type: MessageResponse })
  @HttpCode(200)
  @Post('new-password')
  async updatePassword(@Body() newPasswordDto: NewPasswordDto) {
    return await this.resetPasswordService.updatePassword(newPasswordDto);
  }
}
