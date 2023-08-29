import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query';
import { Mutex } from 'async-mutex';
import { baseQuery } from './baseQuery';
import jwtDecode from 'jwt-decode';
import { JwtPayload } from 'types';
import { TokenResponseDto } from 'types/dto/authentication/TokenResponseDto';
import { toast } from 'src/components/ui/common/Toast/useToast';

const mutex = new Mutex();

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: Record<string, never>) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const payload = jwtDecode<JwtPayload>(localStorage.getItem('accessToken') || '');

        const refreshResult = await baseQuery(
          {
            url: '/auth/refresh',
            body: JSON.stringify({
              refresh_token: localStorage.getItem('refreshToken'),
              id: payload.id,
            }),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          },
          api,
          extraOptions,
        );

        if (refreshResult.error) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        } else {
          const tokens = refreshResult.data as TokenResponseDto;

          if (tokens) {
            localStorage.setItem('accessToken', tokens.accessToken);
            localStorage.setItem('refreshToken', tokens.refreshToken);

            result = await baseQuery(args, api, extraOptions);
          }
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  } else if (result?.error) {
    const { data } = result.error as { data?: { message?: string } };
    console.log('here');

    toast({
      variant: 'destructive',
      title: 'Something went wrong',
      description: data?.message ?? 'Please, try again later.',
    });

    throw new Error("Something went wrong");
  }

  return result;
};
