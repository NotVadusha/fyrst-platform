import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
  Res,
  HttpCode,
  Inject,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { AccessTokenGuard } from './guards/access-token.guard';
import { GoogleOauthGuard } from './guards/google.guard';
import { Response } from 'express';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageResponse, TokenResponse } from 'src/helpers/responceClasses';
import { RegistrationDto } from './dto/registration.dto';
import { ClientProxy } from '@nestjs/microservices';

@ApiTags('Authorization and authentication endpoints')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject('INVOICE_SERVICE') private readonly invoiceServiceClient: ClientProxy,
  ) {}

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, type: MessageResponse })
  @Post('registration')
  async registration(@Body() registrationDto: RegistrationDto) {
    return await this.authService.registration(registrationDto);
  }

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, type: TokenResponse })
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

  @Get('hello')
  async hello() {
    return this.invoiceServiceClient.send('get_hello', {});
  }
}
