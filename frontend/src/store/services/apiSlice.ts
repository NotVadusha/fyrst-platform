import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './helpers/baseQuery';
import { GetAllTimecardsDto } from '../../../types/GetAllTimecardsDto';
import { TimecardFilters } from '../../../types/Dto/TimecardFiltersDto';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  endpoints(builder) {
    return {
      fetchTimecards: builder.query<GetAllTimecardsDto, TimecardFilters>({
        query(args) {
          const params = new URLSearchParams();

          Object.keys(args).forEach(key =>
            params.set(key, String(args[key as keyof TimecardFilters])),
          );

          return '/timecard?' + params;
        },
      }),
    };
  },
});

export const { useFetchTimecardsQuery } = apiSlice;
