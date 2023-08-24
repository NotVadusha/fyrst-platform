import { Timecard } from '../entities/timecard.entity';

export class GetAllTimecardsDto {
  total: number;
  items: Timecard[];
}
