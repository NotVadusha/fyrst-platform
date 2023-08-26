import { TimecardStatus } from 'shared/timecard-status';
import { User } from './User';
import { Booking } from './Booking';

export interface Timecard {
  id: number;
  createdAt: string;
  createdBy: number;
  employee: User;
  approvedAt?: string | null;
  approvedBy?: number | null;
  facilityManager: User;
  status: TimecardStatus;
  bookingId: number;
  booking: Booking;
}
