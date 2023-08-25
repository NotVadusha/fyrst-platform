import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../services/helpers/baseQuery';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
