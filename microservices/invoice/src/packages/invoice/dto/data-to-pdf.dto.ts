import { Booking, Facility, Invoice, Timecard, User } from 'src/types';

export class DataToPdfDto {
  invoice: Invoice;
  timecard: Timecard;
  user: User;
  booking: Booking;
  facility: Facility;
}
