import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BACKEND_URL,
  prepareHeaders: (headers, { getState }) => {
    // const accessToken = getState().authenticationSlice.accessToken;
    // if (accessToken) {
    //   headers.set('authorization', `Bearer ${accessToken}`);
    // }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});
