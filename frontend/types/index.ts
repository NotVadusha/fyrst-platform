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

export type JwtPayload = {
  id: number;
};

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
