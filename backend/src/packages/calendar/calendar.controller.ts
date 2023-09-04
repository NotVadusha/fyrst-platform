import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';

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

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCalendarDto: UpdateCalendarDto) {
    return this.calendarService.update(id, updateCalendarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.calendarService.remove(id);
  }
}
