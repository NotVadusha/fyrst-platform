import { TimecardStatus } from 'shared/timecard-status';

export interface Timecard {
  id: number;
  createdAt: string;
  createdBy: number;
  approvedAt?: string;
  approvedBy?: string;
  status: TimecardStatus;
}
