import { Facility } from '../../../facility/types/models/Facility.model';
import { User } from '../../../user/types/models/User.model';

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
  users: User[];
}
