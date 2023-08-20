import { Injectable } from '@nestjs/common';
import { CreateTimecardDto, UpdateTimecardDto } from './dto';
import { Timecard } from './entities/timecard.entity';
import { ITimecardService } from './interfaces/timecard-service.interface';
import { ITimecardRepository } from './interfaces/timecard-repostiory.interaface';

@Injectable()
export class TimecardService implements ITimecardService {
  constructor(private readonly timecardRepo: ITimecardRepository) {}

  async create(createTimecardDto: CreateTimecardDto): Promise<Timecard> {
    const timecard = this.timecardRepo.instantiateEntity(createTimecardDto);

    return this.timecardRepo.create(timecard);
  }

  async getAll(): Promise<Timecard[]> {
    return this.timecardRepo.getAll();
  }

  async getById(id: number): Promise<Timecard> {
    return await this.timecardRepo.getById(id);
  }
  async update(id: number, updateTimecardDto: UpdateTimecardDto): Promise<Timecard> {
    const timecard = await this.timecardRepo.getById(id);
    Object.assign(timecard, updateTimecardDto);

    return await this.timecardRepo.update(timecard);
  }

  async remove(id: number): Promise<Timecard> {
    const timecard = await this.timecardRepo.getById(id);

    return await this.timecardRepo.remove(timecard);
  }
}
