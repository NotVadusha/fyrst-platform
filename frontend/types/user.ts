export type GetUser = {
  id: number;
};

export type UserDefaultResponse = {
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
};

export type UpdateUserBody = {
  id: number;
};