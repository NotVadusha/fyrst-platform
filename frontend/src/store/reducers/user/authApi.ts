import { apiSlice } from '../apiSlice';
import { MessageResponseDto } from 'types/dto/MessageResponseDto';
import { SignInDto } from 'types/dto/authentication/SignInDto';
import { SignInResponseDto } from 'types/dto/authentication/SignInResponseDto';
import { SignUpDto } from 'types/dto/authentication/SignUpDto';

export const authApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    registration: build.mutation<MessageResponseDto, SignUpDto>({
      query: body => ({
        url: '/auth/registration',
        method: 'POST',
        body,
      }),
    }),
    login: build.mutation<SignInResponseDto, SignInDto>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
      }),
    }),
  }),
});
