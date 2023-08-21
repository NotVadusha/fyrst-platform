import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { RedisService } from 'src/redis';
import { UserService } from 'src/user';
import { NewPasswordDto, ResetPasswordDto } from './dto';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ResetPasswordService {
  private readonly logger = new Logger(ResetPasswordService.name);

  constructor(private redisService: RedisService, private userService: UserService) {}

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      const user = await this.userService.findOneByEmail(resetPasswordDto.email);
      if (!user) throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);

      const token = uuid();

      //sendEmail

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
      const user = await this.userService.findOneByEmail(newPasswordDto.email);
      if (!user) throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);

      const token = await this.redisService.get(`${user.email}_r`);

      if (token !== newPasswordDto.token)
        throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);

      await this.redisService.delete(`${user.email}_r`);

      const hashedPassword = await bcrypt.hash(newPasswordDto.newPassword, 5);

      await this.userService.updateUser(user.id, {
        password: hashedPassword,
      });

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
