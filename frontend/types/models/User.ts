import { Role } from './Role';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  city: string;
  birthdate: Date;
  password: string;
  is_confirmed: boolean;
  role_id: number;
  role: Role;
}
