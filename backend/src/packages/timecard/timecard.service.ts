import { Injectable, Logger } from '@nestjs/common';
import { CreateTimecardDto } from './dto/create-timecard.dto';
import { UpdateTimecardDto } from './dto/update-timecard.dto';
import { TimecardFiltersDto } from './dto/timecard-filters.dto';
import { Timecard } from './entities/timecard.entity';
import { InjectModel } from '@nestjs/sequelize';
import { GetAllTimecardsDto } from './dto/get-all-timecards.dto';
import { User } from '../user/entities/user.entity';
import { Booking } from '../booking/entities/booking.entity';
import { Facility } from '../facility/entities/facility.entity';
import { Roles } from '../roles/entities/roles.entity';
import { Op } from 'sequelize';

@Injectable()
export class TimecardService {
  private logger = new Logger(TimecardService.name);
  constructor(@InjectModel(Timecard) private readonly timecardModel: typeof Timecard) {}

  async create(createTimecardDto: CreateTimecardDto): Promise<Timecard> {
    const timecard = this.timecardModel.build(createTimecardDto as Partial<Timecard>);

    const created = await timecard.save();

    return this.getById(created.id);
  }

  async getAllFiltered(filters: TimecardFiltersDto): Promise<GetAllTimecardsDto> {
    this.logger.log(filters.createdAt);

    const whereFilters: Record<string, any>[] = [];

    if (filters.createdAt !== undefined) {
      whereFilters.push({ createdAt: filters.createdAt });
    }

    if (filters.approvedAt !== undefined) {
      whereFilters.push({ approvedAt: filters.approvedAt });
    }

    if (filters.status !== undefined) {
      whereFilters.push({ status: filters.status });
    }

    const timecards = await this.timecardModel.findAll({
      where: {
        [Op.and]: whereFilters,
      },
      limit: filters.limit,
      offset: filters.offset,
      include: [
        { model: User, as: 'employee', include: [Roles] },
        { model: User, as: 'facilityMaganer', include: [Roles] },
        { model: Booking, include: [Facility] },
      ],
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
      include: [
        { model: User, as: 'employee', include: [Roles] },
        { model: User, as: 'facilityMaganer', include: [Roles] },
        { model: Booking, include: [Facility] },
      ],
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
