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
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTimecardDto } from './dto/create-timecard.dto';
import { TimecardFiltersDto } from './dto/timecard-filters.dto';
import { UpdateTimecardDto } from './dto/update-timecard.dto';
import { TimecardService } from './timecard.service';
import { Readable } from 'stream';
import { Response as ExpressResponse } from 'express';
import { RoleGuard } from '../roles/guards/roles.guard';
import { PermissionsGuard } from '../permissions/guards/permissions.guard';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@ApiTags('Timecard endpoints')
@UseGuards(AccessTokenGuard)
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

  @UseGuards(RoleGuard('WORKER'))
  @Get()
  async getAllFiltered(@Query() query: TimecardFiltersDto) {
    try {
      const timecards = await this.timecardService.getAllFiltered(query);
      this.logger.log('Successfully got all timecards');

      return timecards;
    } catch (error) {
      this.logger.error("Couldn't get timecards", error);
      throw new InternalServerErrorException("Couldn't get timecards");
    }
  }

  @UseGuards(RoleGuard('FACILITY_MANAGER'), PermissionsGuard(['manageTimecards']))
  @Get('export-csv')
  async exportAllTimecardsToCSV(
    @Res() response: ExpressResponse,
    @Query() filters?: TimecardFiltersDto,
  ): Promise<void> {
    try {
      const timecardsData = await this.timecardService.getAllFiltered(filters);
      const timecards = timecardsData.items;

      const csv = await this.timecardService.generateCSVFromTimecards(timecards);

      const stream = new Readable();
      stream.push(csv);
      stream.push(null);

      response.set({
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename=timecards.csv`,
      });

      stream.pipe(response);
    } catch (error) {
      throw new InternalServerErrorException('Failed to export timecards');
    }
  }

  @UseGuards(RoleGuard('FACILITY_MANAGER'), PermissionsGuard(['manageTimecards']))
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

  @UseGuards(RoleGuard('FACILITY_MANAGER'), PermissionsGuard(['manageTimecards']))
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

  @Get('/:userId/workers')
  async getWorkersByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return await this.timecardService.getWorkersByUserId(userId);
  }
}
