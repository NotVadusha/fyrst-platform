import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from '../services/helpers/customBaseQuery';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  tagTypes: ['Timecards'],
  endpoints: () => ({}),
});
