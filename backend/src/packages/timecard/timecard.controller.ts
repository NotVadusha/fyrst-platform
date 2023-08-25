import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TimecardStatus } from 'shared/timecard-status';
import { CreateTimecardDto } from './dto/create-timecard.dto';
import { TimecardFiltersDto } from './dto/timecard-filters.dto';
import { UpdateTimecardDto } from './dto/update-timecard.dto';
import { TimecardService } from './timecard.service';

@ApiTags('timecard')
@Controller('timecard')
export class TimecardController {
  private readonly logger = new Logger(TimecardController.name);

  constructor(private readonly timecardService: TimecardService) {}

  @Post()
  async create(@Body() createTimecardDto: CreateTimecardDto) {
    try {
      const created = await this.timecardService.create(createTimecardDto);
      this.logger.log('Successfully created timecard');
      return created;
    } catch (error) {
      this.logger.error("Coudn't create timecard", error);
      throw new InternalServerErrorException("Couldn't create timecard");
    }
  }

  @Get()
  async getAllFiltered(
    @Query('limit') limit = Number.MAX_SAFE_INTEGER,
    @Query('offset') offset = 0,
    @Query('createdAt') createdAt?: Date,
    @Query('approvedAt') approvedAt?: Date,
    @Query('createdBy') createdBy?: number,
    @Query('approvedBy') approvedBy?: number | null,
    @Query('status') status?: TimecardStatus,
  ) {
    try {
      const filters = new TimecardFiltersDto();
      Object.assign(filters, {
        createdAt,
        approvedAt,
        status,
        createdBy: +createdBy,
        approvedBy: +approvedBy,
      });

      const timecards = await this.timecardService.getAllFiltered(filters, limit, offset);
      this.logger.log('Successfully got all timecards');

      return timecards;
    } catch (error) {
      this.logger.error("Couldn't get timecards", error);
      throw new InternalServerErrorException("Couldn't get timecards");
    }
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    try {
      const timecard = await this.timecardService.getById(id);
      this.logger.log('Successfully got timecard');
      return timecard;
    } catch (error) {
      this.logger.error("Couldn't get timecard", error);
      throw new NotFoundException('Requested timecard could not be found');
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTimecardDto: UpdateTimecardDto,
  ) {
    try {
      const updated = await this.timecardService.update(id, updateTimecardDto);
      this.logger.log('Successfully updated timecard');
      return updated;
    } catch (error) {
      this.logger.error("Couldn't update timecard", error);
      throw new InternalServerErrorException("Couldn't update timecard");
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const removed = await this.timecardService.remove(id);
      this.logger.log('Successfully removed timecard');
      return removed;
    } catch (error) {
      this.logger.error("Couldn't remove timecard", error);
      throw new InternalServerErrorException("Couldn't remove timecard");
    }
  }
}
