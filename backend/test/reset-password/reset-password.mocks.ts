import { NewPasswordDto } from 'src/packages/reset-password/dto/new-password.dto';
import { ResetPasswordDto } from 'src/packages/reset-password/dto/reset-password.dto';

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
}

export let usersMock: TestUser[] = [
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
  },
];

export const resetPasswordDtoMock: ResetPasswordDto = {
  email: 'string@gmail.com',
};

export const newPasswordDtoMock: NewPasswordDto = {
  id: 1,
  new_password: 'qwerty',
  token: 't-o-k-e-n-r',
};

export const resetPasswordServiceMock = {
  resetPassword: jest.fn().mockImplementation(async (resetPasswordDto: ResetPasswordDto) =>
    Promise.resolve({
      message: 'Email was sended',
    }),
  ),
  updatePassword: jest.fn().mockImplementation(async (newPasswordDto: NewPasswordDto) =>
    Promise.resolve({
      message: 'Password was updated',
    }),
  ),
};

export const mailServiceMock = {
  sendEmail: jest
    .fn()
    .mockImplementation(
      async (recepient: string, subject: string, content: string) => Promise<void>,
    ),
};

export const userServiceMock = {
  findOneByEmail: jest
    .fn()
    .mockImplementation(async (email: string) => usersMock.find(user => user.email === email)),
  findOne: jest
    .fn()
    .mockImplementation(async (id: number) => usersMock.find(user => user.id === id)),
  update: jest.fn().mockImplementation(async (updateInfo: Partial<TestUser>, userId: number) => {
    const index = usersMock.findIndex(user => user.id === userId);
    usersMock[index] = {
      ...usersMock[index],
      ...updateInfo,
    };
  }),
};
