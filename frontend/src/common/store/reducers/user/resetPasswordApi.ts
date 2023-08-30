import { MessageResponseDto } from 'src/common/types/dto/MessageResponseDto';
import { apiSlice } from '../apiSlice';
import { ForgotDto } from 'src/common/types/dto/reset-password/ForgotDto';
import { ResetDto } from 'src/common/types/dto/reset-password/ResetDto';

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
