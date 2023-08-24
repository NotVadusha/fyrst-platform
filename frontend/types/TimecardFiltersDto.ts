import { TimecardStatus } from 'shared/timecard-status';

export interface TimecardFiltersDto {
  createdAt?: Date;
  approvedAt?: Date;
  approvedBy?: number | null;
  status?: TimecardStatus;
  createdBy?: number;
}
