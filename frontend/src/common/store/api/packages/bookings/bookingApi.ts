import { Booking } from 'src/common/packages/booking/types/models/Booking.model';
import { BookingFiltersDto } from '../../../../packages/booking/types/dto/BookingFiltersDto';
import { GetAllBookingsDto } from '../../../../packages/booking/types/dto/GetAllBookingsDto';
import { apiSlice } from '../../api';
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
    getBookingRecommendations: builder.query<{ bookings: Booking[]; totalCount: number }, number>({
      query: currentPage => `/booking/recommendations?currentPage=${String(currentPage)}`,
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
  useGetBookingRecommendationsQuery,
} = bookingApi;
