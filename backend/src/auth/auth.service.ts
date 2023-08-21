import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto, RefreshDto } from './dto';
import { RedisService } from 'src/redis';
import { GoogleDto } from './dto';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JWTPayload } from './types';
import { EmailConfirmationService } from 'src/EmailConfirmation/emailConfirmation.service';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private redisService: RedisService,
    private emailConfirmationService: EmailConfirmationService,
  ) {}

  async getTokens(payload: JWTPayload) {
    try {
      const accessToken = await this.jwtService.signAsync(payload);
      const refreshToken = uuid();
      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      this.logger.error('Error:', error.response || error);
      if (error instanceof HttpException) throw error;
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async registration(userDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(userDto.password, 5);
      const createdUser = await this.userService.create({ ...userDto, password: hashedPassword });
      await this.emailConfirmationService.sendVerificationLink(createdUser.email);
      return {
        message: 'Email was sended',
      };
    } catch (error) {
      this.logger.error('Error:', error.response || error);
      if (error instanceof HttpException) throw error;
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.userService.findOneByEmail(loginDto.email);
      if (!user) throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);

      if (!user.is_confirmed)
        throw new HttpException(`The user's email is not confirmed`, HttpStatus.FORBIDDEN);

      const passwordsCompairing = await bcrypt.compare(loginDto.password, user.password);
      if (!passwordsCompairing)
        throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);

      const tokens = await this.getTokens({ id: user.id });
      this.updateRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      this.logger.error('Error:', error.response || error);
      if (error instanceof HttpException) throw error;
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async refresh(refreshDto: RefreshDto) {
    try {
      const user = await this.userService.findOne(refreshDto.id);
      if (!user || !refreshDto.refreshToken)
        throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);

      const currentRefreshToken = await this.redisService.get(user.id.toString());
      if (currentRefreshToken !== refreshDto.refreshToken)
        throw new HttpException('Access Denied', HttpStatus.FORBIDDEN);

      const tokens = await this.getTokens({ id: user.id });
      this.updateRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    } catch (error) {
      this.logger.error('Error:', error.response || error);
      if (error instanceof HttpException) throw error;
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async logout(id: number) {
    try {
      const user = await this.userService.findOne(id);
      if (!user) throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
      this.redisService.delete(user.id.toString());
    } catch (error) {
      this.logger.error('Error:', error.response || error);
      if (error instanceof HttpException) throw error;
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateRefreshToken(id: number, refreshToken: string): Promise<void> {
    await this.redisService.set(id.toString(), refreshToken, 7 * 24 * 60 * 60);
  }

  async googleAuthentication(googleDto: GoogleDto): Promise<any> {
    try {
      let user = await this.userService.findOneByEmail(googleDto.email);

      if (!user) {
        user = await this.userService.create({
          first_name: googleDto.firstName,
          last_name: googleDto.lastName,
          email: googleDto.email,
          is_confirmed: true,
        });
        await this.emailConfirmationService.sendVerificationLink(user.email);
        return {
          message: 'Email was sended',
        };
      } else {
        const tokens = await this.getTokens({ id: user.id });
        this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;
      }
    } catch (error) {
      this.logger.error('Error:', error.response || error);
      if (error instanceof HttpException) throw error;
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
