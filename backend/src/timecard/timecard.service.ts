import { Inject, Injectable } from '@nestjs/common';
import { CreateTimecardDto, TimecardFiltersDto, UpdateTimecardDto } from './dto';
import { Timecard } from './entities';
import { ITimecardService } from './interfaces';
import { ITimecardRepository } from './interfaces/timecard-repostiory.interaface';
import { TIMECARD_REPO_INJECTION_TOKEN } from './constants';

@Injectable()
export class TimecardService implements ITimecardService {
  constructor(
    @Inject(TIMECARD_REPO_INJECTION_TOKEN) private readonly timecardRepo: ITimecardRepository,
  ) {}

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
