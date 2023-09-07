import { Booking } from 'src/common/packages/booking/types/models/Booking.model';

export interface Event {
  id: number;
  eventType: string;
  bookingId: number;
  name: string;
  description: string;
  calendarId: number;
  booking: Booking;
}
