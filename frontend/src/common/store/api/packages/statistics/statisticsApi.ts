import { apiSlice } from '../../api';
import {
  BookingAmountStatisticsResponseDto,
  BookingAmountStatisticsDto,
} from '../../../../packages/statistics/dto/booking-amount-statistics.dto';

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
    };
  },
});

export const { useFetchBookingsAmountStatisticsQuery } = statisticsApi;
