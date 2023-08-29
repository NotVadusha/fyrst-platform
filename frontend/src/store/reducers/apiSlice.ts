import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './helpers/baseQueryWithReauth';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Timecards', 'Bookings'],
  endpoints: () => ({}),
});
