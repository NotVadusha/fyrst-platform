import { Booking } from 'src/common/types/models/Booking';

export interface GetAllBookingsDto {
  bookings: Booking[];
  total: number;
}
