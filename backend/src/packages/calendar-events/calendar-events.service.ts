import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCalendarEventDto } from './dto/create-calendar-event.dto';
import { UpdateCalendarEventDto } from './dto/update-calendar-event.dto';
import { Event } from './entities/event.entity';
import { InjectModel } from '@nestjs/sequelize';

import { CalendarService } from '../calendar/calendar.service';
import { BookingService } from '../booking/booking.service';
import { Booking } from '../booking/entities/booking.entity';

@Injectable()
export class CalendarEventsService {
  constructor(
    @InjectModel(Event)
    private readonly calendarEventRepository: typeof Event,
    private readonly logger: Logger,
    private readonly calendarService: CalendarService,
    private readonly bookingService: BookingService,
  ) {}
  async create(createCalendarEventDto: CreateCalendarEventDto) {
    await this.calendarService.findById(createCalendarEventDto.calendarId);
    if (createCalendarEventDto && createCalendarEventDto.bookingId)
      await this.bookingService.find(createCalendarEventDto.bookingId);

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

  async getAllByCalendarId(calendarId: number) {
    await this.calendarService.findById(calendarId);

    const calendarEvents = await this.calendarEventRepository.findAll({
      where: { calendarId },
      include: Booking,
    });
    this.logger.log(`Retrieved ${calendarEvents.length} calendar events`);

    return calendarEvents;
  }

  async update(id: number, updateCalendarEventDto: UpdateCalendarEventDto) {
    const calendarEvent = await this.findById(id);

    if (updateCalendarEventDto && updateCalendarEventDto.calendarId)
      await this.calendarService.findById(updateCalendarEventDto.calendarId);

    if (updateCalendarEventDto && updateCalendarEventDto.bookingId)
      await this.bookingService.find(updateCalendarEventDto.bookingId);

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
}
