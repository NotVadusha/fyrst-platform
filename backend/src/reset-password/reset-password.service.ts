import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { UserService } from 'src/user/user.service';
import { NewPasswordDto } from './dto/new-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { MailService } from 'src/Mail/mail.service';
import { getMessageContent } from './helpers/getMessageContent';

@Injectable()
export class ResetPasswordService {
  private readonly logger = new Logger(ResetPasswordService.name);

  constructor(
    private redisService: RedisService,
    private userService: UserService,
    private mailService: MailService,
  ) {}

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      const user = await this.userService.findOneByEmail(resetPasswordDto.email);
      if (!user) throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);

      const token = uuid();

      await this.mailService.sendEmail(
        user.email,
        'Reset password',
        await getMessageContent(user.id, token),
      );

      await this.redisService.set(`${user.email}_r`, token, 24 * 60 * 60);

      return {
        message: 'Email was sended',
      };
    } catch (error) {
      this.logger.error('Error:', error.response || error);
      if (error instanceof HttpException) throw error;
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updatePassword(newPasswordDto: NewPasswordDto) {
    try {
      const user = await this.userService.findOne(newPasswordDto.id);
      if (!user) throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);

      const token = await this.redisService.get(`${user.email}_r`);

      if (token !== newPasswordDto.token)
        throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);

      await this.redisService.delete(`${user.email}_r`);

      const hashedPassword = await bcrypt.hash(newPasswordDto.new_password, 5);

      await this.userService.update(
        {
          password: hashedPassword,
        },
        user.id,
      );

      return {
        message: 'Password was updated',
      };
    } catch (error) {
      this.logger.error('Error:', error.response || error);
      if (error instanceof HttpException) throw error;
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
