import { Event } from 'src/common/packages/event/types/models/Event.model';
import { Role } from '../../../roles/types/models/Role.model';
import { Permissions } from 'src/common/packages/permissions/types/Permissions';

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  city: string;
  birthdate: string;
  password: string;
  document_number: string;
  is_confirmed: boolean;
  role_id: number;
  role: Role;
  permissions: Permissions;
  facility_id: number;
  profile: Profile;
  events: Event[];
};

interface Profile {
  id: number;
  user_id: number;
  languages: string[];
  education: string;
  sex: string;
  avatar?: string | null;
  stripeAccountId?: string | null;
}

export interface DecodedUser {
  id: number;
  iat: number;
  exp: number;
}
