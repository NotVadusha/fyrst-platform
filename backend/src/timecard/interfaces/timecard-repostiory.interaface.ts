import { IBaseRepository } from 'shared/base-repository.interface';
import { Timecard } from '../entities';

export interface ITimecardRepository extends IBaseRepository<Timecard> {
  getAll(): Promise<Timecard[]>;
  instantiateEntity(partial: Partial<Timecard>): Timecard;
}
