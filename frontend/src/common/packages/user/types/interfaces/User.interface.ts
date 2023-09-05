export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  city?: string;
  birthdate?: string | null;
  document_number?: string | null;
  password?: string;
  is_confirmed: boolean;
  role_id: number;
}
