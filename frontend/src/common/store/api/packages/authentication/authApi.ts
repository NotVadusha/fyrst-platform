import { apiSlice } from '../../api';
import { MessageResponseDto } from 'src/common/packages/authentication/message/types/dto/MessageResponseDto';
import { SignInDto } from 'src/common/packages/authentication/login/types/dto/SignInDto';
import { SignInResponseDto } from 'src/common/packages/authentication/login/types/dto/SignInResponseDto';
import { SignUpDto } from 'src/common/packages/authentication/login/types/dto/SignUpDto';

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
