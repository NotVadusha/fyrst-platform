import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CalendarEventsService } from './calendar-events.service';
import { CreateCalendarEventDto } from './dto/create-calendar-event.dto';
import { UpdateCalendarEventDto } from './dto/update-calendar-event.dto';

@Controller('calendar-events')
export class CalendarEventsController {
  constructor(private readonly calendarEventsService: CalendarEventsService) {}

  @Post()
  create(@Body() createCalendarEventDto: CreateCalendarEventDto) {
    return this.calendarEventsService.create(createCalendarEventDto);
  }

  @Get()
  findAll() {
    return this.calendarEventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.calendarEventsService.findById(id);
  }

  @Get(':id/calendar')
  findAllByCalendar(@Param('id') id: number) {
    return this.calendarEventsService.getAllByCalendarId(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCalendarEventDto: UpdateCalendarEventDto) {
    return this.calendarEventsService.update(id, updateCalendarEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.calendarEventsService.remove(id);
  }
}
