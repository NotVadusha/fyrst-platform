import { apiSlice } from '../../api';
import {
  BookingAmountStatisticsResponseDto,
  BookingAmountStatisticsDto,
} from '../../../../packages/statistics/dto/booking-amount-statistics.dto';
import { BookingsByMonthResponseDto } from 'src/common/packages/statistics/dto/bookings-by-month-statistics.dto';
import {
  WorkersStatistcsDto,
  WorkersStatistcsResponseDto,
} from 'src/common/packages/statistics/dto/workers-statistcs.dto';
import { WorkersByMonthStatisticsDto } from 'src/common/packages/statistics/dto/workers-by-month-statistics.dto';

const statisticsApi = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      fetchBookingsAmountStatistics: builder.query<
        BookingAmountStatisticsResponseDto,
        BookingAmountStatisticsDto
      >({
        query(filters) {
          const params = new URLSearchParams({ ...filters });

          return '/statistics/booking-amount?' + params;
        },
      }),

      fetchBookingsByMonthStatistics: builder.query<
        BookingsByMonthResponseDto[],
        { facilityId: string }
      >({
        query(filters) {
          const params = new URLSearchParams({ ...filters });

          return '/statistics/bookings-by-month?' + params;
        },
      }),

      fetchWorkerStats: builder.query<WorkersStatistcsResponseDto, WorkersStatistcsDto>({
        query(filters) {
          const params = new URLSearchParams({ ...filters });

          return '/statistics/worker-stats?' + params;
        },
      }),

      fetchWorkersByMonth: builder.query<WorkersByMonthStatisticsDto[], { facilityId: string }>({
        query(filters) {
          const params = new URLSearchParams({ ...filters });

          return '/statistics/workers-by-month?' + params;
        },
      }),
    };
  },
});

export const {
  useFetchBookingsAmountStatisticsQuery,
  useFetchBookingsByMonthStatisticsQuery,
  useFetchWorkerStatsQuery,
  useFetchWorkersByMonthQuery,
} = statisticsApi;
