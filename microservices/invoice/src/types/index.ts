import { TimecardStatus } from 'shared/timecard-status';
import { PaymentStatus } from 'shared/payment-status';

export interface Role {
  id: number;
  label: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  city?: string;
  birthdate?: Date;
  password?: string;
  is_confirmed: boolean;
  role_id: number;
  role: Role;
}

export interface Facility {
  id: number;
  logo: string;
  name: string;
  city: string;
  address: string;
  description: string;
}

export interface Booking {
  id: number;
  status: string;
  createdAt: Date;
  numberOfPositions: number;
  facilitiesRate: number;
  createdBy: number;
  creator: User;
  sex: string;
  age: number;
  education: string;
  positionsAvailable: number;
  workingHours: number;
  pricePerHour: number;
  notes?: string;
  facilityId: number;
  facility: Facility;
}

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

export interface Invoice {
  id: number;
  amountPaid: number;
  status: PaymentStatus;
  path?: string;
  timecardId: number;
}
