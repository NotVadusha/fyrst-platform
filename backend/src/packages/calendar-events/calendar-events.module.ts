import { Logger, Module } from '@nestjs/common';
import { CalendarEventsService } from './calendar-events.service';
import { CalendarEventsController } from './calendar-events.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from './entities/event.entity';
import { BookingModule } from '../booking/booking.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([Event]), BookingModule, UserModule],
  controllers: [CalendarEventsController],
  providers: [CalendarEventsService, Logger],
})
export class CalendarEventsModule {}
