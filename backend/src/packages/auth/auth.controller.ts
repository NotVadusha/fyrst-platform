import { Body, Controller, Post, Get, Request, UseGuards, Res, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { AccessTokenGuard } from './guards/access-token.guard';
import { GoogleOauthGuard } from './guards/google.guard';
import { Response } from 'express';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageResponse, SignInResponse, TokenResponse } from 'src/helpers/responceClasses';
import { RegistrationDto } from './dto/registration.dto';
const cookie = require('cookie');
@ApiTags('Authorization and authentication endpoints')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, type: MessageResponse })
  @Post('registration')
  async registration(@Body() registrationDto: RegistrationDto) {
    return await this.authService.registration(registrationDto);
  }

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, type: SignInResponse })
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'User logout' })
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token',
  })
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@Request() req) {
    await this.authService.logout(req.user['id']);
  }

  @ApiOperation({ summary: 'Refresh JWT token' })
  @ApiResponse({ status: 200, type: TokenResponse })
  @Post('refresh')
  @HttpCode(200)
  async refresh(@Body() refreshDto: RefreshDto) {
    return await this.authService.refresh(refreshDto);
  }

  @ApiOperation({ summary: 'Signin by Google' })
  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleLogin() {}

  @ApiOperation({ summary: 'Google callback after success authentication' })
  @ApiResponse({ status: 302 })
  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleCallback(@Request() req, @Res() res: Response) {
    const result = await this.authService.googleAuthentication(req.user);
    if (!!result.tokens.accessToken) {
      res.setHeader('Set-Cookie', [
        cookie.serialize('accessToken', result.tokens.accessToken, {
          sameSite: 'lax',
          httpOnly: false,
          path: '/',
          secure: false,
          maxAge: 60 * 10,
          domain: process.env.ENVIRONMENT === 'develop' ? '' : '.fyrst.site',
        }),
        cookie.serialize('refreshToken', result.tokens.refreshToken, {
          sameSite: 'lax',
          httpOnly: false,
          path: '/',
          secure: false,
          maxAge: 60 * 10,
          domain: process.env.ENVIRONMENT === 'develop' ? '' : '.fyrst.site',
        }),
        cookie.serialize('user', JSON.stringify(result.user), {
          sameSite: 'lax',
          httpOnly: false,
          path: '/',
          secure: false,
          maxAge: 60 * 10,
          domain: process.env.ENVIRONMENT === 'develop' ? '' : '.fyrst.site',
        }),
      ]);
    }
    res.redirect(process.env.GOOGLE_AUTH_SUCCESS_URL);
  }
}
