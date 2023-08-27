import { apiSlice } from '../apiSlice';
import { MessageResponseDto } from 'types/dto/MessageResponseDto';
import { SignInDto } from 'types/dto/authentication/SignInDto';
import { SignUpDto } from 'types/dto/authentication/SignUpDto';
import { TokenResponseDto } from 'types/dto/authentication/TokenResponseDto';

export const authApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    registration: build.mutation<MessageResponseDto, SignUpDto>({
      query: body => ({
        url: '/auth/registration',
        method: 'POST',
        body,
      }),
    }),
    login: build.mutation<TokenResponseDto, SignInDto>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    logout: build.mutation<undefined, undefined>({
      query: () => ({
        url: '/auth/logout',
      }),
    }),
  }),
});
