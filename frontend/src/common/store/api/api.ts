import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../common/config/baseQueryWithReauth.config';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Timecards', 'Bookings', 'Notification config', 'Calendar', 'Payment', 'Events'],
  endpoints: () => ({}),
});
