import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/packages/user/user.service';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { RedisService } from 'src/packages/redis/redis.service';
import { GoogleDto } from './dto/google.dto';
import { JWTPayload } from 'shared/packages/authentication/types/JWTPayload';
import { EmailConfirmationService } from 'src/packages/email-confirmation/emailConfirmation.service';
import { RegistrationDto } from './dto/registration.dto';
import { UserProfileService } from '../user-profile/user-profile.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private redisService: RedisService,
    private emailConfirmationService: EmailConfirmationService,
    private userProfileService: UserProfileService,
  ) {}

  async getTokens(payload: JWTPayload) {
    try {
      const accessToken = await this.jwtService.signAsync(payload);
      const refreshToken = crypto.randomUUID();
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

  async registration(registrationDto: RegistrationDto) {
    try {
      const hashedPassword = await bcrypt.hash(registrationDto.password, 5);
      const createdUser = await this.userService.create({
        ...registrationDto,
        email: registrationDto.email.toLowerCase(),
        password: hashedPassword,
        role_id: 1,
        is_confirmed: false,
      });
      this.userProfileService.create({
        user_id: createdUser.id,
      });
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
      const user = await this.userService.findOneByEmail(loginDto.email.toLowerCase());

      if (!user) throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);

      if (!user.is_confirmed)
        throw new HttpException(`The user's email is not confirmed`, HttpStatus.FORBIDDEN);
      if (!user.password)
        throw new HttpException('Password does not exist', HttpStatus.BAD_REQUEST);

      const passwordsCompairing = await bcrypt.compare(loginDto.password, user.password);
      if (!passwordsCompairing)
        throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);

      const userInfo = { ...user.dataValues };
      delete userInfo.password;
      delete userInfo.is_confirmed;

      const tokens = await this.getTokens({ id: userInfo.id });
      this.updateRefreshToken(userInfo.id, tokens.refreshToken);
      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        userInfo,
      };
    } catch (error) {
      this.logger.error('Error:', error.response || error);
      if (error instanceof HttpException) throw error;
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async refresh(refreshDto: RefreshDto) {
    try {
      const user = await this.userService.findOne(refreshDto.id);
      if (!user || !refreshDto.refresh_token)
        throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);

      const currentRefreshToken = await this.redisService.get(user.id.toString());
      if (currentRefreshToken !== refreshDto.refresh_token)
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

  private async setGoogleAccessToken(id: number, accessToken: string) {
    console.log('id: ', id);
    console.log('access_token: ', accessToken);
    await this.redisService.set(`google_access_token_${id}`, accessToken, 7 * 24 * 60 * 60);
  }

  async googleAuthentication(googleDto: GoogleDto) {
    try {
      let user = await this.userService.findOneByEmail(googleDto.email);

      if (!user) {
        user = await this.userService.create({
          first_name: googleDto.first_name,
          last_name: googleDto.last_name,
          email: googleDto.email,
          is_confirmed: true,
          role_id: 1,
        });
        this.userProfileService.create({
          user_id: user.id,
        });
      }

      const userInfo = { ...user.dataValues };
      delete userInfo.password;
      delete userInfo.is_confirmed;

      const tokens = await this.getTokens({ id: userInfo.id });
      this.updateRefreshToken(userInfo.id, tokens.refreshToken);
      await this.setGoogleAccessToken(userInfo.id, googleDto.accessToken);
      return {
        tokens,
        user: userInfo,
      };
    } catch (error) {
      this.logger.error('Error:', error.response || error);
      if (error instanceof HttpException) throw error;
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
