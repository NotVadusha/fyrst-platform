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
import * as Papa from 'papaparse';
import _ from 'lodash';
import { prefixKeys } from '../../helpers/prefixKeys';

@Injectable()
export class TimecardService {
  private logger = new Logger(TimecardService.name);
  constructor(@InjectModel(Timecard) private readonly timecardModel: typeof Timecard) {}

  async create(createTimecardDto: CreateTimecardDto): Promise<Timecard> {
    this.logger.log(createTimecardDto);
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

    if (filters.createdBy !== undefined) {
      whereFilters.push({ createdBy: filters.createdBy });
    }

    if (filters.bookingId !== undefined) {
      whereFilters.push({ bookingId: filters.bookingId });
    }

    const timecards = await this.timecardModel.findAll({
      where: whereFilters,
      limit: filters.limit,
      offset: filters.offset,
      include: [
        { model: User, as: 'employee', include: [Roles] },
        { model: User, as: 'facilityManager', include: [Roles] },
        { model: Booking, include: [Facility] },
      ],
    });

    const total = await this.timecardModel.count({
      where: {
        [Op.and]: whereFilters,
      },
    });

    return { items: timecards, total };
  }

  async generateCSVFromTimecards(timecards: Timecard[]): Promise<string> {
    if (timecards.length === 0) {
      throw new Error('No timecards available to generate CSV.');
    }

    const cleanData = timecards.map(timecard => {
      const timecardJSON = timecard.toJSON();
      const bookingJSON = timecard.booking.toJSON();
      const facilityJSON = timecard.booking.facility.toJSON();

      const prefixedBookingJSON = prefixKeys('booking', bookingJSON);
      const prefixedFacilityJSON = prefixKeys('facility', facilityJSON);

      return {
        ...timecardJSON,
        ...prefixedBookingJSON,
        ...prefixedFacilityJSON,
      };
    });
    const fieldKeys = Object.keys(cleanData[0]).filter(
      key => key !== 'employee' && key !== 'facilityManager' && key !== 'booking',
    );
    const csv = Papa.unparse({
      fields: fieldKeys,
      data: cleanData,
    });

    return csv;
  }

  async getById(id: number): Promise<Timecard> {
    return await this.timecardModel.findOne({
      where: {
        id,
      },
      rejectOnEmpty: true,
      include: [
        { model: User, as: 'employee', include: [Roles] },
        { model: User, as: 'facilityManager', include: [Roles] },
        { model: Booking, include: [Facility] },
      ],
    });
  }
  async update(id: number, updateTimecardDto: UpdateTimecardDto): Promise<Timecard> {
    const timecard = await this.getById(id);
    Object.assign(timecard, updateTimecardDto);

    await timecard.save();

    return await this.getById(id);
  }

  async remove(id: number): Promise<Timecard> {
    const timecard = await this.getById(id);

    await timecard.destroy();

    return timecard;
  }
}
