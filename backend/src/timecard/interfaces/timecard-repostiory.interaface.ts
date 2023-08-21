import { IBaseRepository } from 'shared/base-repository.interface';
import { Timecard } from '../entities';
import { TimecardFiltersDto } from '../dto';

export interface ITimecardRepository extends IBaseRepository<Timecard> {
  getAllFiltered(filters: TimecardFiltersDto, limit?: number, offset?: number): Promise<Timecard[]>;

  instantiateEntity(partial: Partial<Timecard>): Timecard;
}
