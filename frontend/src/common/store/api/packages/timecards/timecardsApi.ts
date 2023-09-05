import { apiSlice } from '../../api';
import { Timecard } from '../../../../packages/timecard/types/models/Timecard.model';
import { TimecardFiltersDto } from '../../../../packages/timecard/types/dto/TimecardFiltersDto';
import { GetAllTimecardsDto } from '../../../../packages/timecard/types/dto/GetAllTimecardsDto';
import { CreateTimecardDto } from '../../../../packages/timecard/types/dto/CreateTimecardDto';
import { WorkerDto } from 'src/common/packages/timecard/types/dto/WorkerDto';

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
      fetchWorkersByFacilityAdminId: builder.query<WorkerDto[], number>({
        query: id => `/timecard/${id}/workers`,
      }),
    };
  },
});

export const {
  useFetchTimecardsQuery,
  useFetchTimecardQuery,
  useUpdateTimecardMutation,
  useCreateTimecardMutation,
  useFetchWorkersByFacilityAdminIdQuery,
} = timecardsApi;
