import { apiSlice } from '../apiSlice';
import { Timecard } from '../../../../types/Models/Timecard';
import { TimecardFiltersDto } from '../../../../types/Dto/TimecardFiltersDto';
import { GetAllTimecardsDto } from '../../../../types/Dto/GetAllTimecardsDto';

const timecardsApi = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      fetchTimecards: builder.query<GetAllTimecardsDto, TimecardFiltersDto>({
        query(filters) {
          const params = new URLSearchParams();

          Object.keys(filters).forEach(key =>
            params.set(key, String(filters[key as keyof TimecardFiltersDto])),
          );

          return '/timecard?' + params;
        },
      }),
      fetchTimecard: builder.query<Timecard, number>({
        query(id) {
          return `/timecard/${id}`;
        },
      }),
    };
  },
});

export const { useFetchTimecardsQuery, useFetchTimecardQuery } = timecardsApi;
