export type UpdateUserBody = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string | null;
  city?: string | null;
  birthdate?: string | null;
  document_number?: string | null;
};

export interface EditUserPage {
  id: number;
  phone_number: string;
  first_name: string;
  last_name: string;
  email: string;
  city: string;
  birthdate: string;
  document_number?: string | null;
  role_id: number;
}
