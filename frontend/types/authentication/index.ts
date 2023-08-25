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

export type ForgotBody = {
  email: string;
};

export type ResetBody = {
  id: number;
  token: string;
  new_password: string;
};

export type MessageResponse = {
  message: string;
};

export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};