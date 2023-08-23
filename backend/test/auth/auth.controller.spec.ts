import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'src/packages/auth/auth.controller';
import { AuthService } from 'src/packages/auth/auth.service';
import {
  authServiceMock,
  registrationMock,
  existingId,
  googleDtoMock,
  loginDtoMock,
  refreshDtoMock,
  tokenResponseMock,
} from './auth.mocks';
import { MessageResponse, TokenResponse } from 'src/helpers/responceClasses';
import { Response } from 'express';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('registration', () => {
    describe('should return a message on successful registration', () => {
      let result: MessageResponse;

      beforeEach(async () => {
        result = await authController.registration(registrationMock);
      });

      test('it should call authService', () => {
        expect(authService.registration).toHaveBeenCalledWith(registrationMock);
      });

      test('it should return a message', () => {
        expect(result).toEqual({ message: 'Email was sended' });
      });
    });
  });

  describe('login', () => {
    describe('should return tokens on successful login', () => {
      let result: TokenResponse;

      beforeEach(async () => {
        result = await authController.login(loginDtoMock);
      });

      test('it should call authService', () => {
        expect(authService.login).toHaveBeenCalledWith(loginDtoMock);
      });

      test('it should return access an refresh tokens', () => {
        expect(result).toEqual(tokenResponseMock);
      });
    });
  });

  describe('logout', () => {
    describe('should return nothing on successful logout', () => {
      let result: any;

      beforeEach(async () => {
        result = await authController.logout({ user: { id: existingId } });
      });

      test('it should call authService', () => {
        expect(authService.logout).toHaveBeenCalledWith(existingId);
      });

      test('it should return nothing', () => {
        expect(result).toEqual(undefined);
      });
    });
  });

  describe('refresh', () => {
    describe('should return tokens on successful refresh', () => {
      let result: TokenResponse;

      beforeEach(async () => {
        result = await authController.refresh(refreshDtoMock);
      });

      test('it should call authService', () => {
        expect(authService.refresh).toHaveBeenCalledWith(refreshDtoMock);
      });

      test('it should return access an refresh tokens', () => {
        expect(result).toEqual(tokenResponseMock);
      });
    });
  });

  describe('googleCallback', () => {
    describe('should set cookies and redirect on successful authentication', () => {
      const responseMock: Partial<Response> = {
        cookie: jest.fn(),
        redirect: jest.fn(),
      };
      const request = { user: googleDtoMock };

      beforeEach(async () => {
        await authController.googleCallback(request, responseMock as Response);
      });

      test('it should call redirect to google succes page', () => {
        expect(responseMock.redirect).toHaveBeenCalledWith('http://localhost:3000/google-sucess');
      });

      test('it should pass the access token to the cookie', () => {
        expect(responseMock.cookie).toHaveBeenCalledWith(
          'accessToken',
          tokenResponseMock.accessToken,
          {
            maxAge: 1000 * 60 * 10,
            sameSite: true,
            secure: false,
          },
        );
      });

      test('it should pass the refresh token to the cookie', () => {
        expect(responseMock.cookie).toHaveBeenCalledWith(
          'refreshToken',
          tokenResponseMock.refreshToken,
          {
            maxAge: 1000 * 60 * 10,
            sameSite: true,
            secure: false,
          },
        );
      });
    });
  });
});
