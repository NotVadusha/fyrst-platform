import { Booking, Facility, Timecard, User } from 'src/types';

export class DataToPdfDto {
  timecard: Timecard;
  user: User;
  booking: Booking;
  facility: Facility;
}
