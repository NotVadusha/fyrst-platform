import { Booking } from 'src/common/packages/booking/types/models/Booking.model';

export interface GetAllBookingsDto {
  bookings: Booking[];
  total: number;
}
