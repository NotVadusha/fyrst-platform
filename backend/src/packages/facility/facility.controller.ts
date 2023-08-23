import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { FacilityService } from './facility.service';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('facility')
@Controller('facility')
export class FacilityController {
  private readonly logger = new Logger(FacilityController.name);

  constructor(private readonly facilityService: FacilityService) {}

  @Post()
  async create(@Body() facility: CreateFacilityDto) {
    try {
      const createdFacility = await this.facilityService.create(facility);
      return createdFacility;
    } catch (error) {
      this.logger.error('Failed to create facility', error);
      throw new BadRequestException('Failed to create facility');
    }
  }

  @Get()
  async findAll() {
    try {
      const facilities = await this.facilityService.findAll();
      return facilities;
    } catch (error) {
      this.logger.error('Failed to retrieve facilities', error);
      throw new BadRequestException('Failed to retrieve facilities');
    }
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    try {
      const facility = await this.facilityService.findById(id);
      if (!facility) {
        throw new BadRequestException(`Facility with ID ${id} not found`);
      }
      return facility;
    } catch (error) {
      this.logger.error(`Failed to retrieve facility with ID ${id}`, error);
      throw new BadRequestException(`Failed to retrieve facility with ID ${id}`);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateFacility: UpdateFacilityDto) {
    try {
      const updatedFacility = await this.facilityService.update(id, updateFacility);
      if (!updatedFacility) {
        throw new BadRequestException(`Facility with ID ${id} not found`);
      }
      return updatedFacility;
    } catch (error) {
      this.logger.error(`Failed to update facility with ID ${id}`, error);
      throw new BadRequestException(`Failed to update facility with ID ${id}`);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const deletedFacility = await this.facilityService.remove(id);
      if (!deletedFacility) {
        throw new BadRequestException(`Facility with ID ${id} not found`);
      }
      return deletedFacility;
    } catch (error) {
      this.logger.error(`Failed to delete facility with ID ${id}`, error);
      throw new BadRequestException(`Failed to delete facility with ID ${id}`);
    }
  }
}
