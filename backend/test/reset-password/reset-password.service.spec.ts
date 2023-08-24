import { Test, TestingModule } from '@nestjs/testing';
import {
  mailServiceMock,
  newPasswordDtoMock,
  resetPasswordDtoMock,
  userServiceMock,
  usersMock,
} from './reset-password.mocks';
import { UserService } from 'src/packages/user/user.service';
import { RedisService } from 'src/packages/redis/redis.service';
import { redisServiceMock } from '../redis/redis.mocks';
import { MailService } from 'src/packages/mail/mail.service';
import { MessageResponse } from 'src/helpers/responceClasses';
import { ResetPasswordService } from 'src/packages/reset-password/reset-password.service';
import { getMessageContent } from 'src/packages/reset-password/helpers/getMessageContent';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let resetPasswordService: ResetPasswordService;
  let redisService: RedisService;
  let mailService: MailService;
  let userService: UserService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResetPasswordService,
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: RedisService,
          useValue: redisServiceMock,
        },
        {
          provide: MailService,
          useValue: mailServiceMock,
        },
      ],
    }).compile();

    resetPasswordService = module.get<ResetPasswordService>(ResetPasswordService);
    mailService = module.get<MailService>(MailService);
    redisService = module.get<RedisService>(RedisService);
    userService = module.get<UserService>(UserService);
  });

  describe('resetPassword', () => {
    describe('when resetPassword is called', () => {
      let message: MessageResponse;
      const expectedMessage = {
        message: 'Email was sended',
      };

      jest.spyOn(crypto, 'randomUUID').mockReturnValue('t-o-k-e-n-r');

      beforeEach(async () => {
        message = await resetPasswordService.resetPassword(resetPasswordDtoMock);
      });

      test('it should return message', () => {
        expect(message).toEqual(expectedMessage);
      });

      test('it should call User service', () => {
        expect(userService.findOneByEmail).toHaveBeenCalledWith(resetPasswordDtoMock.email);
      });

      test('it should call Mail service', async () => {
        expect(mailService.sendEmail).toHaveBeenCalledWith(
          resetPasswordDtoMock.email,
          'Reset password',
          await getMessageContent(usersMock[0].id, 't-o-k-e-n-r'),
        );
      });

      test('it should call set method of Redis service', () => {
        expect(redisService.set).toHaveBeenCalledWith(
          `${usersMock[0].id.toString()}_r`,
          't-o-k-e-n-r',
          24 * 60 * 60,
        );
      });
    });
  });

  describe('updatePassword', () => {
    describe('when updatePassword is called', () => {
      let message: MessageResponse;
      const expectedMessage = {
        message: 'Password was updated',
      };

      jest.spyOn(bcrypt, 'hash').mockImplementation(async () => 'password');

      beforeEach(async () => {
        await redisService.set(`1_r`, 't-o-k-e-n-r', 24 * 60 * 60);
        message = await resetPasswordService.updatePassword(newPasswordDtoMock);
      });

      test('it should return message', () => {
        expect(message).toEqual(expectedMessage);
      });

      test('it should call find method User service', () => {
        expect(userService.findOne).toHaveBeenCalledWith(newPasswordDtoMock.id);
      });

      test('it should call update method User service', () => {
        expect(userService.update).toHaveBeenCalledWith(
          {
            password: 'password',
          },
          1,
        );
      });

      test('it should call set method of Redis service', () => {
        expect(redisService.get).toHaveBeenCalledWith(`${usersMock[0].id.toString()}_r`);
      });

      test('it should call delete method of Redis service', () => {
        expect(redisService.delete).toHaveBeenCalledWith(`${usersMock[0].id.toString()}_r`);
      });
    });
  });
});
