import { apiSlice } from '../apiSlice';
import { Timecard } from '../../../../types/models/Timecard';
import { TimecardFiltersDto } from '../../../../types/dto/TimecardFiltersDto';
import { GetAllTimecardsDto } from '../../../../types/dto/GetAllTimecardsDto';
import { CreateTimecardDto } from '../../../../types/dto/CreateTimecardDto';

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
        providesTags: ['Timecards'],
      }),
      fetchTimecard: builder.query<Timecard, number>({
        query(id) {
          return `/timecard/${id}`;
        },
        providesTags: ['Timecards'],
      }),
      updateTimecard: builder.mutation<Timecard, Partial<Timecard> & Pick<Timecard, 'id'>>({
        query({ id, ...body }) {
          return {
            url: `timecard/${id}`,
            method: 'PATCH',
            body,
          };
        },
        invalidatesTags: ['Timecards'],
      }),
      createTimecard: builder.mutation<Timecard, CreateTimecardDto>({
        query(dto) {
          return {
            url: `/timecard`,
            method: 'POST',
            body: dto,
          };
        },
        invalidatesTags: ['Timecards'],
      }),
    };
  },
});

export const {
  useFetchTimecardsQuery,
  useFetchTimecardQuery,
  useUpdateTimecardMutation,
  useCreateTimecardMutation,
} = timecardsApi;
