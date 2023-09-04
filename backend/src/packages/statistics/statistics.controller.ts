import { Controller, Get, InternalServerErrorException, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StatisticsService } from './statistics.service';
import { BookingStatisticsDto } from './dto/booking-amount-statistics.dto';

@ApiTags('Statistics module endpoiints')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('booking-amount')
  async getBookingsAmountStats(@Query() statsDto: BookingStatisticsDto) {
    try {
      return await this.statisticsService.getBookingStats(statsDto.startDate, statsDto.facilityId);
    } catch (error) {
      throw new InternalServerErrorException("Couldn't get statistics on amount of bookings");
    }
  }

  @Get('bookings-by-month')
  async getBookingsByMonth(@Query('facilityId', ParseIntPipe) facilityId: number) {
    try {
      return await this.statisticsService.getBookingsByMonth(facilityId);
    } catch (error) {
      throw new InternalServerErrorException("Couldn't get statistics on bookings by month");
    }
  }
}
