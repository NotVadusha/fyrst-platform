import { Body, Controller, Post, Get, Request, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RefreshDto } from './dto';
import { AccessTokenGuard, GoogleOauthGuard } from './guards';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('registration')
  async registration(@Body() createUserDto: CreateUserDto) {
    return await this.authService.registration(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@Request() req) {
    await this.authService.logout(req.user['id']);
  }

  @Get('refresh')
  async refresh(@Body() refreshDto: RefreshDto) {
    return await this.authService.refresh(refreshDto);
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleLogin() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleCallback(@Request() req, @Res() res: Response) {
    const result = await this.authService.googleAuthentication(req.user);
    result.message
    if (!!result.accessToken) {
      res.cookie('accessToken', result.accessToken, {
        maxAge: 1000 * 60 * 10,
        sameSite: true,
        secure: false,
      });
      res.cookie('refreshToken', result.refreshToken, {
        maxAge: 1000 * 60 * 10,
        sameSite: true,
        secure: false,
      });
    }
    res.redirect('http://localhost:3000/google-sucess');
  }
}
