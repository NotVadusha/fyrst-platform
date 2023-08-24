import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import { GetAllTimecardsDto } from '../../../types/GetAllTimecardsDto';
import { TimecardFiltersDto } from '../../../types/TimecardFiltersDto';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  endpoints(builder) {
    return {
      fetchTimecards: builder.query<
        GetAllTimecardsDto,
        TimecardFiltersDto & { limit?: number; offset?: number }
      >({
        query(args) {
          const params = new URLSearchParams();

          Object.keys(args).forEach(key =>
            params.set(key, String(args[key as keyof TimecardFiltersDto])),
          );

          return '/timecard' + params;
        },
      }),
    };
  },
});

export const { useFetchTimecardsQuery } = apiSlice;
