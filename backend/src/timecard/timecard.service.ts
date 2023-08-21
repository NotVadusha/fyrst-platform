import { Injectable } from '@nestjs/common';
import { CreateTimecardDto, TimecardFiltersDto, UpdateTimecardDto } from './dto';
import { Timecard } from './entities';
import { TimecardRepository } from './timecard.repository';

@Injectable()
export class TimecardService {
  constructor(private readonly timecardRepo: TimecardRepository) {}

  async create(createTimecardDto: CreateTimecardDto): Promise<Timecard> {
    const timecard = this.timecardRepo.instantiateEntity(createTimecardDto);

    return this.timecardRepo.create(timecard);
  }

  async getAllFiltered(
    filters?: TimecardFiltersDto,
    limit?: number,
    offset?: number,
  ): Promise<Timecard[]> {
    return this.timecardRepo.getAllFiltered(filters, limit, offset);
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
