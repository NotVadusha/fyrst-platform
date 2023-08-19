import { Test } from '@nestjs/testing';
import { CreateUserDto, UpdateUserDto } from 'src/user/dto';
import { UserController, UserService } from 'src/user';
import { userStub, existingId, TestUser, updateInfo, nonExistingId } from './user.helpers';
import { NotFoundError } from 'rxjs';
import { NotFoundException } from '@nestjs/common';

jest.mock('../user.service');

describe('UsersController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
  });

  describe('getUser', () => {
    describe('when getUser is called', () => {
      let user: TestUser;

      beforeEach(async () => {
        user = await userController.getOne(existingId);
      });

      test('then it should call usersService', () => {
        expect(userService.findOne).toBeCalledWith(userStub()[0].id);
      });

      test('then is should return a user', () => {
        expect(user).toEqual(userStub()[0]);
      });
    });
  });

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let users: TestUser[];

      beforeEach(async () => {
        users = await userController.getAll();
      });

      test('then it should call usersService', () => {
        expect(userService.findAll).toHaveBeenCalled();
      });

      test('then it should return users', () => {
        expect(users).toEqual(userStub());
      });
    });
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: TestUser;
      let createUserDto: CreateUserDto = userStub()[0];

      beforeEach(async () => {
        user = await userController.create(userStub()[0]);
      });

      test('then it should call usersService', () => {
        expect(userService.create).toHaveBeenCalledWith(userStub()[0]);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub()[0]);
      });
    });
  });

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let user: TestUser;
      let updatedUser: TestUser = userStub()[0];

      beforeEach(async () => {
        user = await userController.update(existingId, updateInfo);
      });

      test('then it should call usersService', () => {
        expect(userService.update).toHaveBeenCalledWith(updateInfo, existingId);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(updatedUser);
      });
    });
  });

  describe('deleteUser', () => {
    describe('When delete called', () => {
      let user: boolean;

      beforeEach(async () => {
        user = await userController.delete(existingId);
      });

      test('then it should call usersService', () => {
        expect(userService.delete).toHaveBeenCalledWith(existingId);
      });

      test('then it should return a "true"', () => {
        expect(user).toEqual(true);
      });
    });
  });
});
