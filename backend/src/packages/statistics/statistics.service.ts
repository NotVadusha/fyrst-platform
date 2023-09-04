import { Injectable } from '@nestjs/common';
import { Booking } from '../booking/entities/booking.entity';
import { InjectModel } from '@nestjs/sequelize';
import { BookingStatisticsResponseDto } from './dto/booking-amount-statistics.dto';
import { BookingsByMonthDto } from './dto/bookings-by-month.dto';
import { Op } from 'sequelize';
import moment from 'moment';

@Injectable()
export class StatisticsService {
  constructor(@InjectModel(Booking) private bookingModel: typeof Booking) {}

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

  async getBookingsByMonth(facilityId: number): Promise<BookingsByMonthDto[]> {
    const startDate = moment().subtract(1, 'year');

    const result: BookingsByMonthDto[] = [];

    while (startDate.add(1, 'month') <= moment()) {
      const numberOfBookings = await this.bookingModel.count({
        where: {
          facilityId,
          createdAt: {
            [Op.gte]: startDate,
          },
        },
      });

      result.push({ month: startDate.format('M'), numberOfBookings });

      startDate.add(1, 'month');
    }

    return result;
  }
}
