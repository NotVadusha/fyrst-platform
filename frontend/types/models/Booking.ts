import { Facility } from './Facility';
import { User } from './User';

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
  notes: string;
  facilityId: number;
  facility: Facility;
  startDate: Date;
  endDate: Date;
  employersName: string;
}
