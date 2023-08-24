import { CreateUserDto } from 'src/packages/user/dto/create-user.dto';

export const usersMock = (): TestUser[] => {
  return [
    {
      id: 1,
      first_name: 'string',
      last_name: 'string',
      email: 'string',
      phone_number: 'string',
      city: 'string',
      birthdate: new Date('2004-12-12T00:00:00.000Z'),
      password: 'string',
      is_confirmed: true,
      updatedAt: new Date('2023-08-19T17:18:28.307Z'),
      createdAt: new Date('2023-08-19T17:18:28.307Z'),
      role_id: 1,
    },
    {
      id: 2,
      first_name: 'string2',
      last_name: 'string2',
      email: 'string2',
      phone_number: 'string2',
      city: 'string2',
      birthdate: new Date('2004-12-12T00:00:00.000Z'),
      password: 'string2',
      is_confirmed: true,
      updatedAt: new Date('2023-08-19T17:20:21.416Z'),
      createdAt: new Date('2023-08-19T17:20:21.416Z'),
      role_id: 1,
    },
  ];
};

export interface TestUser extends CreateUserDto {
  id: number;
  updatedAt?: Date;
  createdAt?: Date;
}

export const updateInfo = {
  first_name: 'string',
  last_name: 'string',
  email: 'string',
  phone_number: 'string',
  city: 'string',
  birthdate: new Date('2004-12-12T00:00:00.000Z'),
  password: 'string',
  is_confirmed: true,
};

export const existingId = 1;
