import { apiSlice } from '../apiSlice';
import { Timecard } from '../../../../types/models/Timecard';
import { TimecardFiltersDto } from '../../../../types/dto/TimecardFiltersDto';
import { GetAllTimecardsDto } from '../../../../types/dto/GetAllTimecardsDto';

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
