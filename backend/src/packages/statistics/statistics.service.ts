import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Booking } from '../booking/entities/booking.entity';
import { Timecard } from '../timecard/entities/timecard.entity';
import { WorkersStatistcsDto, WorkersStatistcsResponseDto } from './dto/workers-statistics.dto';
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

    const rejected = await this.bookingModel.count({
      where: {
        facilityId,
        createdAt: {
          [Op.gte]: startDate,
        },
        status: 'rejected',
      },
    });

    return {
      total,
      completed,
      pending,
      rejected,
    };
  }

  async getBookingsByMonth(facilityId: number): Promise<BookingsByMonthResponseDto[]> {
    const startDate = moment(new Date()).subtract(1, 'year').startOf('month');
    this.logger.debug(startDate.format('DD-MM-YYYY'));

    const result: BookingsByMonthResponseDto[] = [];

    while (startDate.add(1, 'M') <= moment()) {
      const nextMonth = moment(startDate).add(1, 'M');

      const numberOfBookings = await this.bookingModel.count({
        where: {
          facilityId,
          createdAt: {
            [Op.gte]: startDate,
            [Op.lte]: nextMonth,
          },
        },
      });

      result.push({ month: startDate.format('MMMM'), numberOfBookings });
    }

    return result;
  }

  async getWorkerStats(statsDto: WorkersStatistcsDto): Promise<WorkersStatistcsResponseDto> {
    const Sequelize = this.bookingModel.sequelize.Sequelize;

    this.logger.log('Before average');
    const workerStats = (await this.bookingModel.findOne({
      raw: true,
      attributes: [
        [
          Sequelize.fn('AVG', Sequelize.literal('"numberOfPositions" - "positionsAvailable"')),
          'averageWorkers',
        ],
        [
          Sequelize.fn('SUM', Sequelize.literal('"numberOfPositions" - "positionsAvailable"')),
          'totalWorkers',
        ],
      ],
      where: {
        facilityId: statsDto.facilityId,
        createdAt: {
          [Op.gte]: statsDto.startDate,
        },
      },
    })) as unknown as WorkersStatistcsResponseDto;

    const averagePayment = (await this.timecardModel.findOne({
      raw: true,
      attributes: [
        [
          Sequelize.fn(
            'AVG',
            Sequelize.literal(
              '"booking"."pricePerHour" * ("Timecard"."hoursWorked" - "Timecard"."lunchHours")',
            ),
          ),
          'value',
        ],
      ],
      where: { status: 'approved' },
      include: [{ model: Booking, attributes: [] }],
      group: ['booking.id'],
    })) as unknown as { value: number };

    return { ...workerStats, averagePayment: averagePayment.value };
  }

  async getWorkersByMonth(facilityId: number) {
    const Sequelize = this.bookingModel.sequelize.Sequelize;
    const startDate = moment(new Date()).subtract(1, 'year').startOf('month');

    const result: WorkersByMonthResponseDto[] = [];

    while (startDate.add(1, 'M') <= moment()) {
      const nextMonth = moment(startDate).add(1, 'M');
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
            [Op.lte]: nextMonth,
          },
        },
      })) as unknown as { numberOfWorkers: number };

      result.push({
        month: startDate.format('MMMM'),
        numberOfWorkers: Math.max(Number(workersByMonth.numberOfWorkers), 0),
      });
    }

    return result;
  }
}
