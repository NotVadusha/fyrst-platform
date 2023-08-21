export interface Booking {
  id: number;
  status: BookingStatus;
  created_at: Date;
  number_of_positions: number;
  facilities_rate: number;
  created_by: number;
  sex: string;
  age: number;
  education: string;
  positions_available: number;
  working_hours: number;
  price_per_hour: number;
  notes?: string | null;
  facility_id: number;
  start_date: Date;
  end_date: Date;
}

export enum BookingStatus {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  Cancelled = 'Cancelled',
  Completed = 'Completed',
}
