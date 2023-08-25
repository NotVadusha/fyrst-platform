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
