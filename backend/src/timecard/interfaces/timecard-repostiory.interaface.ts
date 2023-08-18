import { IBaseRepository } from 'shared/base-repository.interface';
import { Timecard } from '../entities/timecard';

export interface ITimecardRepository extends IBaseRepository<Timecard> {
  instantiateEntity(partial: Partial<Timecard>): Timecard;
}
