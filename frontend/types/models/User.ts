import { Role } from './Role';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  city: string;
  birthdate: Date;
  password: string;
  isConfirmed: boolean;
  roleId: number;
  role: Role;
}
