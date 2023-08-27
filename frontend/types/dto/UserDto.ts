export interface UserDefaultResponse {
  id: number;
  phone_number: string;
  first_name: string;
  last_name: string;
  email: string;
  city: string;
  birthdate: Date;
  password: string;
  is_confirmed: boolean;
  role_id: number;
  updatedAt: Date;
  createdAt: Date;
}

export interface UpdateUserBody {
  id: number;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  city?: string;
  birthdate?: Date;
  role_id?: number;
}

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
