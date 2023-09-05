import { Injectable, Logger } from '@nestjs/common';
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
import { WorkersByMonthResponseDto } from './dto/workers-by-month.dto';
import * as moment from 'moment';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(Booking) private bookingModel: typeof Booking,
    @InjectModel(Timecard) private timecardModel: typeof Timecard,
  ) {}

  private logger = new Logger(StatisticsService.name);

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

  async getWorkersByMonth(facilityId: number) {
    const Sequelize = this.bookingModel.sequelize.Sequelize;
    const startDate = moment(new Date()).subtract(1, 'year');

    const result: WorkersByMonthResponseDto[] = [];

    while (startDate.add(1, 'M') <= moment()) {
      const workersByMonth = (await this.bookingModel.findOne({
        raw: true,
        attributes: [
          [
            Sequelize.fn('SUM', Sequelize.literal('"numberOfPositions" - "positionsAvailable"')),
            'numberOfWorkers',
          ],
        ],
        where: {
          facilityId,
          createdAt: {
            [Op.gte]: startDate,
          },
        },
      })) as unknown as { numberOfWorkers: number };

      result.push({
        month: startDate.format('MMMM'),
        numberOfWorkers: Number(workersByMonth.numberOfWorkers),
      });
    }

    return result;
  }
}
