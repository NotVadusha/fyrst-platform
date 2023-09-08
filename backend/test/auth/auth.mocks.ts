import * as bcrypt from 'bcryptjs';
import { SignInResponse, TokenResponse } from 'src/helpers/responceClasses';
import { GoogleDto } from 'src/packages/auth/dto/google.dto';
import { LoginDto } from 'src/packages/auth/dto/login.dto';
import { RefreshDto } from 'src/packages/auth/dto/refresh.dto';
import { RegistrationDto } from 'src/packages/auth/dto/registration.dto';
import { JWTPayload } from 'shared/packages/authentication/types/JWTPayload';
import { CreateUserDto } from 'src/packages/user/dto/create-user.dto';

export interface TestUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  city?: string;
  birthdate?: Date;
  password?: string;
  is_confirmed: boolean;
  role_id: number;
}

export const usersMock: TestUser[] = [
  {
    id: 1,
    first_name: 'string',
    last_name: 'string',
    email: 'string@gmail.com',
    phone_number: 'string',
    city: 'string',
    birthdate: new Date('2002-12-12T00:00:00.000Z'),
    password: 'string',
    is_confirmed: true,
    role_id: 1,
  },
];

export const googleDtoMock: GoogleDto = {
  first_name: 'string',
  last_name: 'string',
  email: 'string@gmail.com',
};

export const registrationMock: RegistrationDto = {
  first_name: 'string',
  last_name: 'string',
  email: 'string@gmail.com',
  password: 'string',
};

export const refreshDtoMock: RefreshDto = {
  refresh_token: 'r-e-f-r-e-s-h',
  id: 1,
};

export const loginDtoMock: LoginDto = {
  email: 'string@gmail.com',
  password: 'string',
};

export const tokenResponseMock: TokenResponse = {
  accessToken: 'access',
  refreshToken: 'refresh',
};

export const signInResponseMock: SignInResponse = {
  accessToken: 'access',
  refreshToken: 'refresh',
  userInfo: {
    id: 1,
    first_name: 'Ivan',
    last_name: 'Ivanov',
    email: 'qwerty@gmail.com',
    role_id: 1,
  },
};

export const payloadMock: JWTPayload = {
  id: 1,
};

export const existingId = 1;

export const authServiceMock = {
  registration: jest
    .fn()
    .mockImplementation((createUserDto: RegistrationDto) =>
      Promise.resolve({ message: 'Email was sended' }),
    ),
  login: jest.fn().mockImplementation((loginDto: LoginDto) => Promise.resolve(signInResponseMock)),
  logout: jest.fn().mockImplementation((id: number) => Promise.resolve(null)),
  refresh: jest
    .fn()
    .mockImplementation((refreshDto: RefreshDto) =>
      Promise.resolve({ accessToken: 'access', refreshToken: 'refresh' }),
    ),
  googleAuthentication: jest.fn().mockImplementation((googleDto: GoogleDto) =>
    Promise.resolve({
      tokens: {
        accessToken: 'access',
        refreshToken: 'refresh',
      },
      user: {
        id: 1,
        first_name: 'Ivan',
        last_name: 'Ivanov',
        email: 'qwerty@gmail.com',
        role_id: 1,
      },
    }),
  ),
};

export const jwtServiceMock = {
  signAsync: jest.fn().mockImplementation((payload: any) => Promise.resolve('accessToken')),
};

export const emailConfirmationServiceMock = {
  sendVerificationLink: jest.fn().mockImplementation((email: string) => Promise<void>),
};

export const userServiceMock = {
  create: jest.fn().mockImplementation(async (createUserDto: CreateUserDto) => {
    usersMock.push({
      ...usersMock[0],
      ...createUserDto,
      id: 1,
      password: bcrypt.hashSync(createUserDto.password, 5),
      is_confirmed: false,
    });
    return usersMock[1];
  }),
  findOneByEmail: jest.fn().mockImplementation(async (email: string) => ({
    ...usersMock.find(user => user.email === email),
    dataValues: usersMock.find(user => user.email === email),
  })),
  findOne: jest
    .fn()
    .mockImplementation(async (id: number) => usersMock.find(user => user.id === id)),
};

export const userProfileServiceMock = {
  create: jest.fn().mockImplementation((data: any) => Promise.resolve(null)),
};
