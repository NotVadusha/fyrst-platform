import { IBaseRepository } from 'shared/base-repository.interface';
import { Timecard } from '../entities/timecard.entity';

export interface ITimecardRepository extends IBaseRepository<Timecard> {
  instantiateEntity(partial: Partial<Timecard>): Timecard;
}
