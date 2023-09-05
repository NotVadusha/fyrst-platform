import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Booking } from '../booking/entities/booking.entity';
import { Timecard } from '../timecard/entities/timecard.entity';
import {
  AverageWorkersStatistcsDto,
  AverageWorkersStatistcsResponseDto,
} from './dto/average-workers-statistics.dto';
import { BookingStatisticsResponseDto } from './dto/booking-amount-statistics.dto';
import { BookingsByMonthResponseDto } from './dto/bookings-by-month.dto';
import * as moment from 'moment';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Booking) private bookingModel: typeof Booking,
    @InjectModel(Timecard) private timecardModel: typeof Timecard,
  ) {}

  async getBookingStats(
    startDate: Date,
    facilityId: number,
  ): Promise<BookingStatisticsResponseDto> {
    const total = await this.bookingModel.count({
      where: {
        facilityId,
        createdAt: {
          [Op.gte]: startDate,
        },
      },
    });

    const completed = await this.bookingModel.count({
      where: {
        facilityId,
        createdAt: {
          [Op.gte]: startDate,
        },
        status: 'completed',
      },
    });

    const pending = await this.bookingModel.count({
      where: {
        facilityId,
        createdAt: {
          [Op.gte]: startDate,
        },
        status: 'pending',
      },
    });

    return {
      total,
      completed,
      pending,
    };
  }

  async getBookingsByMonth(facilityId: number): Promise<BookingsByMonthResponseDto[]> {
    const startDate = moment(new Date()).subtract(1, 'year');

    const result: BookingsByMonthResponseDto[] = [];

    while (startDate.add(1, 'M') <= moment()) {
      const numberOfBookings = await this.bookingModel.count({
        where: {
          facilityId,
          createdAt: {
            [Op.gte]: startDate,
          },
        },
      });

      result.push({ month: startDate.format('MMMM'), numberOfBookings });
    }

    return result;
  }

  async getAverageWorkers(
    statsDto: AverageWorkersStatistcsDto,
  ): Promise<AverageWorkersStatistcsResponseDto> {
    const Sequelize = this.bookingModel.sequelize.Sequelize;

    const average = (await this.bookingModel.findOne({
      attributes: [
        [
          Sequelize.fn('AVG', Sequelize.literal('"numberOfPositions" - "positionsAvailable"')),
          'averageWorkers',
        ],
      ],
      where: {
        facilityId: statsDto.facilityId,
        createdAt: {
          [Op.gte]: statsDto.startDate,
        },
      },
    })) as unknown as AverageWorkersStatistcsResponseDto;

    return average;
  }
}
