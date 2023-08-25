import { Timecard } from './Models/Timecard';

export interface GetAllTimecardsDto {
  items: Timecard[];
  total: number;
}
