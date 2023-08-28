import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BookingFiltersDto } from '../../../../types/dto/BookingFiltersDto';
import { GetAllBookingsDto } from '../../../../types/dto/GetAllBookingsDto';
export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/v1/' }),
  endpoints: builder => ({
    getAllBookings: builder.query<GetAllBookingsDto, BookingFiltersDto>({
      query(filters) {
        const params = new URLSearchParams();

        Object.keys(filters).forEach(key =>
          params.set(key, String(filters[key as keyof BookingFiltersDto])),
        );
        console.log(params.toString());

        return '/booking/get-by?' + params;
      },
    }),
    getBookingById: builder.query({
      query: id => `booking/${id}`,
    }),
    createBooking: builder.mutation({
      query: newBooking => ({
        url: 'booking',
        method: 'POST',
        body: newBooking,
      }),
    }),
    updateBooking: builder.mutation({
      query: ({ id, ...fields }) => ({
        url: `booking/${id}`,
        method: 'PATCH',
        body: fields,
      }),
    }),
    deleteBooking: builder.mutation({
      query: id => ({
        url: `booking/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useGetBookingByIdQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
