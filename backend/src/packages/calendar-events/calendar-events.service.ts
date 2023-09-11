import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCalendarEventDto } from './dto/create-calendar-event.dto';
import { UpdateCalendarEventDto } from './dto/update-calendar-event.dto';
import { Event } from './entities/event.entity';
import { InjectModel } from '@nestjs/sequelize';
import { BookingService } from '../booking/booking.service';
import { format } from 'date-fns';
import { UserService } from '../user/user.service';
import { CreateBookingEventDto } from './dto/create-booking-event.dto';
import { GoogleCalendarService } from '../google-calendar/google-calendar.service';

@Injectable()
export class CalendarEventsService {
  constructor(
    @InjectModel(Event)
    private readonly calendarEventRepository: typeof Event,
    private readonly logger: Logger,
    private readonly bookingService: BookingService,
    private readonly userService: UserService,
    private readonly googleCalendarService: GoogleCalendarService,
  ) {}

  async create(createCalendarEventDto: CreateCalendarEventDto) {
    const calendarEvent = await this.calendarEventRepository.create({ ...createCalendarEventDto });

    this.logger.log(`Created note with ID ${calendarEvent.id}`);
    return calendarEvent;
  }

  async findAll() {
    const calendarEvents = await this.calendarEventRepository.findAll();

    this.logger.log(`Retrieved ${calendarEvents.length} calendar events`);
    return calendarEvents;
  }

  async findById(id: number) {
    const calendarEvent = await this.calendarEventRepository.findByPk(id);

    if (!calendarEvent) throw new NotFoundException('Calendar event not found');

    return calendarEvent;
  }

  async update(id: number, updateCalendarEventDto: UpdateCalendarEventDto) {
    const calendarEvent = await this.findById(id);

    await calendarEvent.update(updateCalendarEventDto);
    this.logger.log(`Updated calendarEvent with ID ${id}`);

    return calendarEvent;
  }

  async remove(id: number) {
    const calendarEvent = await this.findById(id);

    await calendarEvent.destroy();

    this.logger.log(`Deleted calendar event with ID ${id}`);
    return calendarEvent;
  }

  async createBookingEvent(createBookingEventDto: CreateBookingEventDto) {
    const { bookingId, userId } = createBookingEventDto;
    const booking = await this.bookingService.find(bookingId);
    await this.userService.findOne(userId);

    const dateFormat = 'MMMM, dd';
    const startDate = booking.startDate;
    const endDate = booking.endDate;

    const name = `Work at ${booking.facility.name}`;
    const description = `You have job at ${booking.facility.name} from ${format(
      startDate,
      dateFormat,
    )} to ${format(endDate, dateFormat)}`;

    const event = {
      name,
      description,
      startDate,
      endDate,
      user_id: userId,
    };
    await this.googleCalendarService.createEvent(event, userId);
    return await this.create(event);
  }
}
