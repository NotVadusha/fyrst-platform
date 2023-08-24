import { Injectable } from '@nestjs/common';
import { CreateTimecardDto } from './dto/create-timecard.dto';
import { UpdateTimecardDto } from './dto/update-timecard.dto';
import { TimecardFiltersDto } from './dto/timecard-filters.dto';
import { Timecard } from './entities/timecard.entity';
import { InjectModel } from '@nestjs/sequelize';
import { validateOrReject } from 'class-validator';
import { GetAllTimecardsDto } from './dto/get-all-timecards.dto';

@Injectable()
export class TimecardService {
  constructor(@InjectModel(Timecard) private readonly timecardModel: typeof Timecard) {}

  async create(createTimecardDto: CreateTimecardDto): Promise<Timecard> {
    const timecard = this.timecardModel.build(createTimecardDto as Partial<Timecard>);

    return await timecard.save();
  }

  async getAllFiltered(
    filters?: TimecardFiltersDto,
    limit?: number,
    offset?: number,
  ): Promise<GetAllTimecardsDto> {
    Object.keys(filters).forEach(
      key => (filters[key] === undefined || isNaN(filters[key])) && delete filters[key],
    );

    //eslint-disable-next-line
    //@ts-ignore
    if (filters.approvedBy === 'null') {
      filters.approvedBy = null;
    }

    await validateOrReject(filters);

    const timecards = await this.timecardModel.findAll({
      where: { ...filters },
      limit: limit,
      offset: offset,
    });

    const total = await this.timecardModel.count();

    return { items: timecards, total };
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
