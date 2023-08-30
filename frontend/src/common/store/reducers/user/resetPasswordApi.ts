import { MessageResponseDto } from 'src/common/packages/authentication/message/types/dto/MessageResponseDto';
import { apiSlice } from '../apiSlice';
import { ForgotPasswordDto } from 'src/common/packages/authentication/password/types/dto/ForgotPasswordDto';
import { ResetDto } from 'src/common/packages/authentication/password/types/dto/ResetPasswordDto';

export const resetPasswordApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    forgot: build.query<MessageResponseDto, ForgotPasswordDto>({
      query: body => ({
        url: '/reset-password',
        method: 'POST',
        body,
      }),
    }),
    reset: build.mutation<MessageResponseDto, ResetDto>({
      query: body => ({
        url: '/reset-password/new-password',
        method: 'POST',
        body,
      }),
    }),
  }),
});
