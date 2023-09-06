import { Inject, Injectable, Logger } from '@nestjs/common';
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
import { getFilterParams } from 'shared/getFilterParams';
import { NotificationService } from '../notification/notification.service';
import { notificationTemplateTimecard } from 'shared/packages/notification/types/notificationTemplates';
import * as Papa from 'papaparse';
import _ from 'lodash';
import { flatten } from 'flat';

@Injectable()
export class TimecardService {
  private logger = new Logger(TimecardService.name);
  constructor(
    @InjectModel(Timecard) private readonly timecardModel: typeof Timecard,
    private readonly notificationService: NotificationService,
  ) {}

  async create(createTimecardDto: CreateTimecardDto): Promise<Timecard> {
    this.logger.log(createTimecardDto);
    const timecard = this.timecardModel.build(createTimecardDto as Partial<Timecard>);

    const created = await timecard.save();

    return this.getById(created.id);
  }

  async getAllFiltered(filters: TimecardFiltersDto): Promise<GetAllTimecardsDto> {
    this.logger.log(filters.createdAt);

    const timecardFilters: Record<string, any>[] = getFilterParams(filters, [
      'createdAt',
      'approvedAt',
      'status',
      'createdBy',
      'bookingId',
    ]);

    const bookingFilters: Record<string, any>[] = getFilterParams(filters, ['facilityId']);

    this.logger.log(JSON.stringify(bookingFilters));

    const timecards = await this.timecardModel.findAll({
      where: timecardFilters,
      limit: filters.limit,
      offset: filters.offset,
      include: [
        { model: User, as: 'employee', include: [Roles] },
        { model: User, as: 'facilityManager', include: [Roles] },
        { model: Booking, where: bookingFilters, include: [Facility] },
      ],
    });

    const total = await this.timecardModel.count({
      where: timecardFilters,
      include: [{ model: Booking, where: bookingFilters, include: [Facility] }],
    });

    return { items: timecards, total };
  }

  async generateCSVFromTimecards(timecards: Timecard[]): Promise<string> {
    if (timecards.length === 0) {
      throw new Error('No timecards available to generate CSV.');
    }

    const cleanData = timecards.map(timecard => flatten(timecard.toJSON(), { delimiter: '_' }));
    const fieldKeys = Object.keys(cleanData[0]).filter(
      key => !['employee_password', 'booking_facility_logo'].includes(key),
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
    const updatedTimecard = await this.getById(id);
    if (updateTimecardDto?.status) {
      this.notificationService.create({
        recipientId: updatedTimecard.createdBy,
        content: notificationTemplateTimecard(updatedTimecard.id, updateTimecardDto.status),
        type: 'timecard',
        refId: updatedTimecard.id,
      });
    }
    return updatedTimecard;
  }

  async remove(id: number): Promise<Timecard> {
    const timecard = await this.getById(id);

    await timecard.destroy();

    return timecard;
  }
}
