import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './helpers/baseQueryWithReauth';
import { baseQuery } from './helpers/baseQuery';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: ['Timecards', 'Bookings'],
  endpoints: () => ({}),
});
