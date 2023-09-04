import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post()
  create(@Body() createCalendarDto: CreateCalendarDto) {
    return this.calendarService.create(createCalendarDto);
  }

  @Get()
  findAll() {
    return this.calendarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.calendarService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.calendarService.remove(id);
  }
}
