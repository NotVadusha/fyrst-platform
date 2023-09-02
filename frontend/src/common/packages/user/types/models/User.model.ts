import { Role } from '../../../roles/types/models/Role.model';
import { Permissions } from 'src/common/packages/permissions/types/Permissions';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  city: string;
  birthdate: string;
  password: string;
  is_confirmed: boolean;
  role_id: number;
  role: Role;
  permissions: Permissions;
}

export interface DecodedUser {
  id: number;
  iat: number;
  exp: number;
}
