import { Injectable, Logger } from '@nestjs/common';
import { CreateTimecardDto } from './dto/create-timecard.dto';
import { UpdateTimecardDto } from './dto/update-timecard.dto';
import { TimecardFiltersDto } from './dto/timecard-filters.dto';
import { Timecard } from './entities/timecard.entity';
import { InjectModel } from '@nestjs/sequelize';
import { validateOrReject } from 'class-validator';
import { instanceToInstance } from 'class-transformer';

@Injectable()
export class TimecardService {
  private readonly logger = new Logger(TimecardService.name);
  constructor(@InjectModel(Timecard) private readonly timecardModel: typeof Timecard) {}

  async create(createTimecardDto: CreateTimecardDto): Promise<Timecard> {
    const timecard = this.timecardModel.build(createTimecardDto as Partial<Timecard>);

    return await timecard.save();
  }

  async getAllFiltered(
    filters?: TimecardFiltersDto,
    limit?: number,
    offset?: number,
  ): Promise<Timecard[]> {
    Object.keys(filters).forEach(
      key => (filters[key] === undefined || isNaN(filters[key])) && delete filters[key],
    );

    //eslint-disable-next-line
    //@ts-ignore
    if (filters.approvedBy === 'null') {
      filters.approvedBy = null;
    }

    await validateOrReject(filters);

    return await this.timecardModel.findAll({
      where: { ...filters },
      limit: limit,
      offset: offset,
    });
  }

  async getById(id: number): Promise<Timecard> {
    return await this.timecardModel.findOne({
      where: {
        id,
      },
      rejectOnEmpty: true,
    });
  }
  async update(id: number, updateTimecardDto: UpdateTimecardDto): Promise<Timecard> {
    const timecard = await this.getById(id);
    Object.assign(timecard, updateTimecardDto);

    return await timecard.save();
  }

  async remove(id: number): Promise<Timecard> {
    const timecard = await this.getById(id);

    await timecard.destroy();

    return timecard;
  }
}
