import { Booking } from 'types/models/Booking';
import { BookingFiltersDto } from '../../../../types/dto/BookingFiltersDto';
import { GetAllBookingsDto } from '../../../../types/dto/GetAllBookingsDto';
import { apiSlice } from '../apiSlice';
export const bookingApi = apiSlice.injectEndpoints({
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
      providesTags: ['Bookings'],
    }),
    getBookingById: builder.query<Booking, number>({
      query: id => `booking/${id}`,
      providesTags: ['Bookings'],
    }),
    createBooking: builder.mutation({
      query(newBooking) {
        return { url: 'booking', method: 'POST', body: newBooking };
      },
      invalidatesTags: ['Bookings'],
    }),
    updateBooking: builder.mutation({
      query: ({ id, ...fields }) => ({
        url: `booking/${id}`,
        method: 'PATCH',
        body: fields,
      }),
    }),
    addUserToBooking: builder.mutation({
      query({ bookingId, userId }) {
        return {
          url: `booking/${bookingId}/addUser/${userId}`,
          method: 'POST',
        };
      },
      invalidatesTags: ['Bookings'],
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
  useAddUserToBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
