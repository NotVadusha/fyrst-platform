import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { FacilityDto } from './dto/facility.dto';

@Controller('facility')
export class FacilityController {
  constructor(private readonly facilityService: FacilityService) {}

  @Post()
  create(@Body() facility: FacilityDto) {
    return this.facilityService.create(facility);
  }

  @Get()
  findAll() {
    return this.facilityService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.facilityService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFacility: FacilityDto) {
    return this.facilityService.update(id, updateFacility);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.facilityService.remove(id);
  }
}
