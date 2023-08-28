import { Timecard } from '../models/Timecard';

export interface GetAllTimecardsDto {
  items: Timecard[];
  total: number;
}
