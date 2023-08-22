import { Test, TestingModule } from '@nestjs/testing';
import {
  newPasswordDtoMock,
  resetPasswordDtoMock,
  resetPasswordServiceMock,
} from './reset-password.mocks';
import { ResetPasswordController } from 'src/packages/reset-password/reset-password.controller';
import { ResetPasswordService } from 'src/packages/reset-password/reset-password.service';
import { MessageResponse } from 'src/helpers/responceClasses';

describe('ResetPasswordController', () => {
  let resetPasswordController: ResetPasswordController;
  let resetPasswordService: ResetPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResetPasswordController],
      providers: [
        {
          provide: ResetPasswordService,
          useValue: resetPasswordServiceMock,
        },
      ],
    }).compile();

    resetPasswordController = module.get<ResetPasswordController>(ResetPasswordController);
    resetPasswordService = module.get<ResetPasswordService>(ResetPasswordService);
  });

  describe('reset password', () => {
    describe('should return a message about successful sending of the mail', () => {
      let result: MessageResponse;

      beforeEach(async () => {
        result = await resetPasswordController.resetPassword(resetPasswordDtoMock);
      });

      test('it should call resetPassword service', () => {
        expect(resetPasswordService.resetPassword).toHaveBeenCalledWith(resetPasswordDtoMock);
      });

      test('it should return a message', () => {
        expect(result).toEqual({
          message: 'Email was sended',
        });
      });
    });
  });

  describe('reset password', () => {
    describe('should return a message about successful password update', () => {
      let result: MessageResponse;

      beforeEach(async () => {
        result = await resetPasswordController.updatePassword(newPasswordDtoMock);
      });

      test('it should call resetPassword service', () => {
        expect(resetPasswordService.updatePassword).toHaveBeenCalledWith(newPasswordDtoMock);
      });

      test('it should return a message', () => {
        expect(result).toEqual({
          message: 'Password was updated',
        });
      });
    });
  });
});
