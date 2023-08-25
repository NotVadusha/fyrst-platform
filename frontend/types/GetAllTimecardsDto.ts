import { Timecard } from './timecard';

export interface GetAllTimecardsDto {
  items: Timecard[];
  total: number;
}
