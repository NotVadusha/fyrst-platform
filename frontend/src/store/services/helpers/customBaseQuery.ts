import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query';
import { Mutex } from 'async-mutex';
import { baseQuery } from './baseQuery';
import jwtDecode from 'jwt-decode';

const mutex = new Mutex();

type JwtPayload = {
  id: number;
};

type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
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
          const tokens = refreshResult.data as TokenResponse;

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
  }

  return result;
};
