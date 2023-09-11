import { Logger, Module } from '@nestjs/common';
import { CalendarEventsService } from './calendar-events.service';
import { CalendarEventsController } from './calendar-events.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from './entities/event.entity';
import { BookingModule } from '../booking/booking.module';
import { UserModule } from '../user/user.module';
import { GoogleCalendarModule } from '../google-calendar/google-calendar.module';

@Module({
  imports: [SequelizeModule.forFeature([Event]), BookingModule, UserModule, GoogleCalendarModule],
  controllers: [CalendarEventsController],
  providers: [CalendarEventsService, Logger],
})
export class CalendarEventsModule {}
