import { apiSlice } from '../../api';

export const calendarApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createBookingEvent: builder.mutation({
      query({ bookingId, userId }) {
        return {
          url: '/calendar-events/booking-event',
          method: 'POST',
          body: { bookingId, userId },
        };
      },
      invalidatesTags: ['Events'],
    }),
  }),
});

export const { useCreateBookingEventMutation } = calendarApi;
