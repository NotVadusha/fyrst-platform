import { Role } from '../../../roles/types/models/Role.model';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  city: string;
  birthdate: Date;
  password: string;
  document_number: string;
  is_confirmed: boolean;
  role_id: number;
  role: Role;
}

export interface DecodedUser {
  id: number;
  iat: number;
  exp: number;
}
