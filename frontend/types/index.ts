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

<<<<<<< HEAD
export type JwtPayload = {
  id: number;
};
=======
export interface User {
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
>>>>>>> e1a2c10b142b35980122dedbcac24335bd5ccfac
