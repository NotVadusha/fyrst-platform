import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BACKEND_URL,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});
