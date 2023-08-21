import { UpdateTimecardDto, CreateTimecardDto, TimecardFiltersDto } from '../dto';
import { Timecard } from '../entities';

export interface ITimecardService {
  create(createTimecardDto: CreateTimecardDto): Promise<Timecard>;

  getAllFiltered(filters: TimecardFiltersDto, limit?: number, offset?: number): Promise<Timecard[]>;

  getById(id: number): Promise<Timecard>;

  update(id: number, updateTimecardDto: UpdateTimecardDto): Promise<Timecard>;

  remove(id: number): Promise<Timecard>;
}
