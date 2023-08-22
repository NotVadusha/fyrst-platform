import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/packages/auth/auth.service';
import {
  createUserDtoMock,
  emailConfirmationServiceMock,
  googleDtoMock,
  jwtServiceMock,
  loginDtoMock,
  payloadMock,
  refreshDtoMock,
  userServiceMock,
  usersMock,
} from './auth.mocks';
import { UserService } from 'src/packages/user/user.service';
import { RedisService } from 'src/packages/redis/redis.service';
import { redisServiceMock } from 'test/redis/redis.mocks';
import { EmailConfirmationService } from 'src/packages/email-confirmation/emailConfirmation.service';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { MessageResponse, TokenResponse } from 'src/helpers/responceClasses';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let redisService: RedisService;
  let emailConfirmationService: EmailConfirmationService;
  let userService: UserService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: RedisService,
          useValue: redisServiceMock,
        },
        {
          provide: EmailConfirmationService,
          useValue: emailConfirmationServiceMock,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    emailConfirmationService = module.get<EmailConfirmationService>(EmailConfirmationService);
    redisService = module.get<RedisService>(RedisService);
    userService = module.get<UserService>(UserService);
  });

  describe('getTokens', () => {
    describe('when getTokens is called', () => {
      let tokens: TokenResponse;
      const expectedTokens = {
        accessToken: 'accessToken',
        refreshToken: 'r-e-f-r-e-s-h',
      };

      jest.spyOn(crypto, 'randomUUID').mockReturnValue('r-e-f-r-e-s-h');

      beforeEach(async () => {
        tokens = await authService.getTokens(payloadMock);
      });

      test('it should return access and refresh tokens', () => {
        expect(tokens).toEqual(expectedTokens);
      });

      test('it should call Jwt service', () => {
        expect(jwtService.signAsync).toHaveBeenCalledWith(payloadMock);
      });
    });
  });

  describe('registrtion', () => {
    describe('when registration is called', () => {
      let message: MessageResponse;

      jest.spyOn(bcrypt, 'hash').mockImplementation(async () => 'password');

      beforeEach(async () => {
        message = await authService.registration(createUserDtoMock);
      });

      test('it should create new user and return a message', () => {
        expect(message).toEqual({ message: 'Email was sended' });
      });

      test('it should call User service', () => {
        expect(userService.create).toHaveBeenCalledWith({
          ...createUserDtoMock,
          password: 'password',
        });
      });

      test('it should call Email confirmation service', () => {
        expect(emailConfirmationService.sendVerificationLink).toHaveBeenCalledWith(
          createUserDtoMock.email,
        );
      });
    });
  });

  describe('login', () => {
    describe('when login is called', () => {
      let tokens: TokenResponse;
      const expectedTokens = {
        accessToken: 'accessToken',
        refreshToken: 'r-e-f-r-e-s-h',
      };

      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);
      jest.spyOn(crypto, 'randomUUID').mockReturnValue('r-e-f-r-e-s-h');

      beforeEach(async () => {
        tokens = await authService.login(loginDtoMock);
      });

      test('it should return access and refresh tokens', () => {
        expect(tokens).toEqual(expectedTokens);
      });

      test('it should call User service', () => {
        expect(userService.findOneByEmail).toHaveBeenCalledWith(loginDtoMock.email);
      });

      test('it should call Redis service', () => {
        expect(redisService.set).toHaveBeenCalledWith(
          usersMock[0].id.toString(),
          'r-e-f-r-e-s-h',
          7 * 24 * 60 * 60,
        );
      });
    });
  });

  describe('refresh', () => {
    describe('when refresh is called', () => {
      let tokens: TokenResponse;
      const expectedTokens = {
        accessToken: 'accessToken',
        refreshToken: 'r-e-f-r-e-s-h',
      };

      jest.spyOn(crypto, 'randomUUID').mockReturnValue('r-e-f-r-e-s-h');

      beforeEach(async () => {
        tokens = await authService.refresh(refreshDtoMock);
      });

      test('it should return access and refresh tokens', () => {
        expect(tokens).toEqual(expectedTokens);
      });

      test('it should call User service', () => {
        expect(userService.findOne).toHaveBeenCalledWith(refreshDtoMock.id);
      });

      test('it should call get method of Redis service', () => {
        expect(redisService.get).toHaveBeenCalledWith(refreshDtoMock.id.toString());
      });

      test('it should call set method of Redis service', () => {
        expect(redisService.set).toHaveBeenCalledWith(
          refreshDtoMock.id.toString(),
          'r-e-f-r-e-s-h',
          7 * 24 * 60 * 60,
        );
      });
    });
  });

  describe('logout', () => {
    describe('when logout is called', () => {
      let result: unknown;

      beforeEach(async () => {
        result = await authService.logout(1);
      });

      test('it should return undefined', () => {
        expect(result).toBeUndefined();
      });

      test('it should call User service', () => {
        expect(userService.findOne).toHaveBeenCalledWith(refreshDtoMock.id);
      });

      test('it should call Redis service', () => {
        expect(redisService.delete).toHaveBeenCalledWith(refreshDtoMock.id.toString());
      });
    });
  });

  describe('updateRefreshToken', () => {
    describe('when updateRefreshToken is called', () => {
      let result: unknown;

      beforeEach(async () => {
        result = await authService.updateRefreshToken(1, 'r-e-f-r-e-s-h');
      });

      test('it should return undefined', () => {
        expect(result).toBeUndefined();
      });

      test('it should call Redis service', () => {
        expect(redisService.set).toHaveBeenCalledWith(
          refreshDtoMock.id.toString(),
          'r-e-f-r-e-s-h',
          7 * 24 * 60 * 60,
        );
      });
    });
  });

  describe('googleAuthentication', () => {
    describe('when googleAuthentication is called', () => {
      let tokens: TokenResponse;
      const expectedTokens = {
        accessToken: 'accessToken',
        refreshToken: 'r-e-f-r-e-s-h',
      };

      jest.spyOn(crypto, 'randomUUID').mockReturnValue('r-e-f-r-e-s-h');

      beforeEach(async () => {
        tokens = await authService.googleAuthentication(googleDtoMock);
      });

      test('it should return access and refresh tokens', () => {
        expect(tokens).toEqual(expectedTokens);
      });

      test('it should call User service', () => {
        expect(userService.findOneByEmail).toHaveBeenCalledWith(googleDtoMock.email);
      });

      test('it should call set method of Redis service', () => {
        expect(redisService.set).toHaveBeenCalledWith(
          usersMock[0].id.toString(),
          'r-e-f-r-e-s-h',
          7 * 24 * 60 * 60,
        );
      });
    });
  });
});
