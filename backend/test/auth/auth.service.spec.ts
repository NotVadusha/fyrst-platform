import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/packages/auth/auth.service';
import {
  registrationMock,
  emailConfirmationServiceMock,
  googleDtoMock,
  jwtServiceMock,
  loginDtoMock,
  payloadMock,
  refreshDtoMock,
  userServiceMock,
  usersMock,
  userProfileServiceMock,
} from './auth.mocks';
import { UserService } from 'src/packages/user/user.service';
import { RedisService } from 'src/packages/redis/redis.service';
import { redisServiceMock } from 'test/redis/redis.mocks';
import { EmailConfirmationService } from 'src/packages/email-confirmation/emailConfirmation.service';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { MessageResponse, SignInResponse, TokenResponse } from 'src/helpers/responceClasses';
import { UserProfileService } from 'src/packages/user-profile/user-profile.service';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let redisService: RedisService;
  let emailConfirmationService: EmailConfirmationService;
  let userService: UserService;
  let userProfileService: UserProfileService;

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
        {
          provide: UserProfileService,
          useValue: userProfileServiceMock,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    emailConfirmationService = module.get<EmailConfirmationService>(EmailConfirmationService);
    redisService = module.get<RedisService>(RedisService);
    userService = module.get<UserService>(UserService);
    userProfileService = module.get<UserProfileService>(UserProfileService);
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
        message = await authService.registration(registrationMock);
      });

      test('it should create new user and return a message', () => {
        expect(message).toEqual({ message: 'Email was sended' });
      });

      test('it should call User service', () => {
        expect(userService.create).toHaveBeenCalledWith({
          ...registrationMock,
          password: 'password',
          is_confirmed: false,
          role_id: 1,
        });
      });

      test('it should call Email confirmation service', () => {
        expect(emailConfirmationService.sendVerificationLink).toHaveBeenCalledWith(
          registrationMock.email,
        );
      });
    });
  });

  describe('login', () => {
    describe('when login is called', () => {
      let result: SignInResponse;
      const expectedResult = {
        accessToken: 'accessToken',
        refreshToken: 'r-e-f-r-e-s-h',
        userInfo: {
          id: 1,
          first_name: 'string',
          last_name: 'string',
          email: 'string@gmail.com',
          phone_number: 'string',
          city: 'string',
          birthdate: new Date('2002-12-12T00:00:00.000Z'),
          role_id: 1,
        },
      };

      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);
      jest.spyOn(crypto, 'randomUUID').mockReturnValue('r-e-f-r-e-s-h');

      beforeEach(async () => {
        result = await authService.login(loginDtoMock);
      });

      test('it should return access and refresh tokens', () => {
        expect(result).toEqual(expectedResult);
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
      let result;
      const expectedTokens = {
        tokens: {
          accessToken: 'accessToken',
          refreshToken: 'r-e-f-r-e-s-h',
        },
        user: {
          id: 1,
          first_name: 'string',
          last_name: 'string',
          email: 'string@gmail.com',
          phone_number: 'string',
          city: 'string',
          birthdate: new Date('2002-12-12T00:00:00.000Z'),
          role_id: 1,
        },
      };

      jest.spyOn(crypto, 'randomUUID').mockReturnValue('r-e-f-r-e-s-h');

      beforeEach(async () => {
        result = await authService.googleAuthentication(googleDtoMock);
      });

      test('it should return acces token, refresh token and user info', () => {
        expect(result).toEqual(expectedTokens);
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
