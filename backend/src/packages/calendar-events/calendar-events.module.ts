import { Module } from '@nestjs/common';
import { CalendarEventsService } from './calendar-events.service';
import { CalendarEventsController } from './calendar-events.controller';
import { BookingModule } from '../booking/booking.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from './entities/event.entity';
import { CalendarModule } from '../calendar/calendar.module';

@Module({
  imports: [SequelizeModule.forFeature([Event]), BookingModule, CalendarModule],
  controllers: [CalendarEventsController],
  providers: [CalendarEventsService],
})
export class CalendarEventsModule {}
