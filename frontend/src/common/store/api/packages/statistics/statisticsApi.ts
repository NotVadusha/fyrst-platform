import { apiSlice } from '../../api';
import {
  BookingAmountStatisticsResponseDto,
  BookingAmountStatisticsDto,
} from '../../../../packages/statistics/dto/booking-amount-statistics.dto';
import { BookingsByMonthResponseDto } from 'src/common/packages/statistics/dto/bookings-by-month-statistics.dto';
import {
  AverageWorkersStatistcsDto,
  AverageWorkersStatistcsResponseDto,
} from 'src/common/packages/statistics/dto/average-workers-statistcs.dto';

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

      fetchAverageWorkers: builder.query<
        AverageWorkersStatistcsResponseDto,
        AverageWorkersStatistcsDto
      >({
        query(filters) {
          const params = new URLSearchParams({ ...filters });

          return '/statistics/average-workers?' + params;
        },
      }),
    };
  },
});

export const {
  useFetchBookingsAmountStatisticsQuery,
  useFetchBookingsByMonthStatisticsQuery,
  useFetchAverageWorkersQuery,
} = statisticsApi;
