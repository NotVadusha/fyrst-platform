import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCalendarEventDto } from './dto/create-calendar-event.dto';
import { UpdateCalendarEventDto } from './dto/update-calendar-event.dto';
import { Event } from './entities/event.entity';
import { InjectModel } from '@nestjs/sequelize';

import { CalendarService } from '../calendar/calendar.service';
import { BookingService } from '../booking/booking.service';

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
    await this.validateCalendarExists(createCalendarEventDto.calendarId);
    if (createCalendarEventDto && createCalendarEventDto.bookingId)
      await this.validateBookingExists(createCalendarEventDto.bookingId);

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

    if (!calendarEvent) throw new NotFoundException('Calendar envent not found');

    return calendarEvent;
  }

  async getAllByCalendarId(calendarId: number) {
    await this.validateCalendarExists(calendarId);

    const calendarEvents = await this.calendarEventRepository.findAll({ where: { calendarId } });
    this.logger.log(`Retrieved ${calendarEvents.length} calendar events`);

    return calendarEvents;
  }

  async update(id: number, updateCalendarEventDto: UpdateCalendarEventDto) {
    const calendarEvent = await this.findById(id);

    if (updateCalendarEventDto && updateCalendarEventDto.calendarId)
      await this.validateCalendarExists(updateCalendarEventDto.calendarId);

    if (updateCalendarEventDto && updateCalendarEventDto.bookingId)
      await this.validateBookingExists(updateCalendarEventDto.bookingId);

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

  private async validateCalendarExists(calendarId: number) {
    const calendar = await this.calendarService.findById(calendarId);
    if (!calendar) throw new NotFoundException('Calendar not found');
  }

  private async validateBookingExists(bookingId: number) {
    const booking = await this.bookingService.find(bookingId);
    if (!booking) throw new NotFoundException('Booking not found');
  }
}
