import { apiSlice } from '../../api';
import { Event } from 'src/common/packages/event/types/models/Event.model';

export const calendarApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllEvents: builder.query<Event[], number>({
      query(calendarId) {
        return '/calendar-events/' + calendarId + '/calendar';
      },
    }),
    createEvents: builder.mutation({
      query(newEvent) {
        return { url: '/calendar-events', method: 'POST', body: newEvent };
      },
    }),
  }),
});

export const { useGetAllEventsQuery, useCreateEventsMutation } = calendarApi;
