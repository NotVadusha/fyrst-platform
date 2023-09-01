import { TimecardStatus } from 'shared/timecard-status';
import { User } from '../../../user/types/models/User.model';
import { Booking } from '../../../booking/types/models/Booking.model';

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
  hoursWorked: number;
  lunchHours: number;
}
