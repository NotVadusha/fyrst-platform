import { MessageResponseDto } from 'types/dto/MessageResponseDto';
import { apiSlice } from '../apiSlice';
import { ForgotDto } from 'types/dto/reset-password/ForgotDto';
import { ResetDto } from 'types/dto/reset-password/ResetDto';

export const resetPasswordApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    forgot: build.query<MessageResponseDto, ForgotDto>({
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
