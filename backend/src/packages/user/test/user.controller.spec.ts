import { Test } from '@nestjs/testing';
import { CreateUserDto } from 'src/packages/user/dto/create-user.dto';
import { UserController } from 'src/packages/user/user.controller';
import { UserService } from 'src/packages/user/user.service';
import { usersMock, existingId, TestUser, updateInfo } from './user.helpers';
import { UpdateUserDto } from '../dto/update-user.dto';

describe('UsersController', () => {
  let userController: UserController;
  let userService: UserService;
  const defaultUsers = usersMock();

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((user: CreateUserDto) => Promise.resolve({ id: '1', ...user })),
            findAll: jest.fn().mockResolvedValue(defaultUsers),
            findOne: jest
              .fn()
              .mockImplementation((id: number) => Promise.resolve({ ...defaultUsers[0], id })),
            update: jest
              .fn()
              .mockResolvedValue((id: number, updateUserInfo: UpdateUserDto) =>
                Promise.resolve(updateUserInfo),
              ),
            delete: jest.fn().mockResolvedValue((id: number) => Promise.resolve(true)),
          },
        },
      ],
      controllers: [UserController],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
  });

  describe('getUser', () => {
    describe('when getUser is called', () => {
      let user: TestUser;
      const expectedUser = defaultUsers[0];

      beforeEach(async () => {
        user = await userController.getOne(existingId);
      });

      test('then it should call usersService', () => {
        expect(userService.findOne).toBeCalledWith(user.id);
      });

      test('then is should return a user', () => {
        expect(user).toEqual(expectedUser);
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
        expect(users).toEqual(defaultUsers);
      });
    });
  });

  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: TestUser;
      const createUserDto: CreateUserDto = usersMock()[0];

      beforeEach(async () => {
        user = await userController.create(createUserDto);
      });

      test('then it should call usersService', () => {
        expect(userService.create).toHaveBeenCalledWith(createUserDto);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(createUserDto);
      });
    });
  });

  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let user: TestUser;
      const updatedUser: TestUser = usersMock()[0];

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