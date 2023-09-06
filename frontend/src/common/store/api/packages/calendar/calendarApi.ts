import { Calendar } from 'src/common/packages/calendar/types/models/Calendar';
import { apiSlice } from '../../api';
import { Event } from 'src/common/packages/event/types/models/Event.model';

export const calendarApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllEvents: builder.query<Event[], number>({
      query(calendarId) {
        return '/calendar-events/' + calendarId + '/calendar';
      },
      providesTags: ['Calendar'],
    }),
    createEvents: builder.mutation({
      query(newEvent) {
        return { url: '/calendar-events', method: 'POST', body: newEvent };
      },
      invalidatesTags: ['Calendar'],
    }),
    getCalendar: builder.query<Calendar, number>({
      query(userId) {
        return '/calendar/' + userId + '/user';
      },
      providesTags: ['Calendar'],
    }),
  }),
});

export const { useGetAllEventsQuery, useCreateEventsMutation, useGetCalendarQuery } = calendarApi;