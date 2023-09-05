export type UpdateUserBody = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string | null;
  city?: string | null;
  birthdate?: string | null;
  document_number?: string | null;
};
