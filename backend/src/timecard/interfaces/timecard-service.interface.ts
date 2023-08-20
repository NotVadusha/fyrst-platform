import { UpdateTimecardDto, CreateTimecardDto } from '../dto';
import { Timecard } from '../entities/timecard.entity';

export interface ITimecardService {
  create(createTimecardDto: CreateTimecardDto): Promise<Timecard>;

  getAll(): Promise<Timecard[]>;

  getById(id: number): Promise<Timecard>;

  update(id: number, updateTimecardDto: UpdateTimecardDto): Promise<Timecard>;

  remove(id: number): Promise<Timecard>;
}
