import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Timecard } from '../timecard/entities/timecard.entity';
import { Booking } from '../booking/entities/booking.entity';
import { User } from '../user/entities/user.entity';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';

@Module({
  imports: [SequelizeModule.forFeature([User, Timecard, Booking])],
  providers: [StatisticsService],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
