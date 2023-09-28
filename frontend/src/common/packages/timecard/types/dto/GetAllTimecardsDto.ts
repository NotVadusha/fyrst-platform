import { Timecard } from '../models/Timecard.model';

export interface GetAllTimecardsDto {
  items: Timecard[];
  total: number;
}
