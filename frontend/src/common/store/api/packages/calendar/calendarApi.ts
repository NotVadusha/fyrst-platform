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
    updateEvent: builder.mutation({
      query: ({ id, startDate, endDate }) => ({
        url: `calendar-events/${id}`,
        method: 'PATCH',
        body: { startDate, endDate },
      }),
      invalidatesTags: ['Events'],
    }),
  }),
});

export const { useCreateBookingEventMutation, useUpdateEventMutation } = calendarApi;
