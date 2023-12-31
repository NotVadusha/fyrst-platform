import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CalendarEventsService } from './calendar-events.service';
import { CreateCalendarEventDto } from './dto/create-calendar-event.dto';
import { UpdateCalendarEventDto } from './dto/update-calendar-event.dto';
import { CreateBookingEventDto } from './dto/create-booking-event.dto';

@Controller('calendar-events')
export class CalendarEventsController {
  constructor(private readonly calendarEventsService: CalendarEventsService) {}

  @Post()
  async create(@Body() createCalendarEventDto: CreateCalendarEventDto) {
    return await this.calendarEventsService.create(createCalendarEventDto);
  }

  @Post('/booking-event')
  async createBookingEvent(@Body() createBookingEventDto: CreateBookingEventDto) {
    return await this.calendarEventsService.createBookingEvent(createBookingEventDto);
  }
  @Get()
  async findAll() {
    return await this.calendarEventsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.calendarEventsService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCalendarEventDto: UpdateCalendarEventDto) {
    return await this.calendarEventsService.update(id, updateCalendarEventDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.calendarEventsService.remove(id);
  }
}
