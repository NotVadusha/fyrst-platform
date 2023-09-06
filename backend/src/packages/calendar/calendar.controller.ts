import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post()
  async create(@Body() createCalendarDto: CreateCalendarDto) {
    return await this.calendarService.create(createCalendarDto);
  }

  @Get()
  async findAll() {
    return await this.calendarService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.calendarService.findById(id);
  }
  @Get(':id/user')
  async findByUserId(@Param('id') id: number) {
    return await this.calendarService.findByUserId(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.calendarService.remove(id);
  }
}
