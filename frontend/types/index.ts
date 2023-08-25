interface SVGIconProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
  className?: string;
}

export interface NavItem {
  title: string;
  path: string;
  icon?: React.FunctionComponent<SVGIconProps>;
  items?: NavItem[];
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string | null;
  city?: string | null;
  birthdate?: string | null;
  password?: string | null;
  is_confirmed: boolean;
  role_id: string;
}
export type SignUpBody = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type SignInBody = {
  email: string;
  password: string;
};

export type MessageResponse = {
  message: string;
};

export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};

// export interface NavItemWithChildren extends NavItem {
//   items: NavItem[];
// }
