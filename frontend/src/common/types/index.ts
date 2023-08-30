export interface SVGIconProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
  className?: string;
}
export type JwtPayload = {
  id: number;
}; // TODO: add this to shared

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  city?: string;
  birthdate?: string | null;
  password?: string;
  is_confirmed: boolean;
  role_id: number;
} // TODO: remove User from index
