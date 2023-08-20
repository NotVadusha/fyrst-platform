import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { CreateTimecardDto, UpdateTimecardDto } from './dto';
import { TIMECARD_SERVICE_INJECTION_TOKEN } from './constants';
import { ITimecardService } from './interfaces';

@Controller('timecard')
export class TimecardController {
  constructor(
    @Inject(TIMECARD_SERVICE_INJECTION_TOKEN) private readonly timecardService: ITimecardService,
  ) {}

  @Post()
  create(@Body() createTimecardDto: CreateTimecardDto) {
    return this.timecardService.create(createTimecardDto);
  }

  @Get()
  findAll() {
    return this.timecardService.getAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.timecardService.getById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTimecardDto: UpdateTimecardDto) {
    return this.timecardService.update(id, updateTimecardDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.timecardService.remove(id);
  }
}
