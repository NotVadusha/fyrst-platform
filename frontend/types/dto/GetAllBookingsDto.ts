import { Booking } from 'types/models/Booking';

export interface GetAllBookingsDto {
  bookings: Booking[];
  total: number;
}
