export interface UserDefaultResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  city?: string;
  birthdate?: string;
  password?: string;
  is_confirmed: boolean;
  role_id: number;
}

export type UpdateUserBody = Omit<
  UserDefaultResponse,
  'id' | 'password' | 'is_confirmed' | 'updatedAt' | 'createdAt'
>;

export interface EditUserPage {
  id: number;
  phone_number: string;
  first_name: string;
  last_name: string;
  email: string;
  city: string;
  birthdate: string;
  role_id: number;
}
