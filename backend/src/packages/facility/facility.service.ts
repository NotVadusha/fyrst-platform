import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFacilityDto } from './dto/create-facility.dto';

import { InjectModel } from '@nestjs/sequelize';
import { Facility } from './entities/facility.entity';
import { UpdateFacilityDto } from './dto/update-facility.dto';

@Injectable()
export class FacilityService {
  constructor(@InjectModel(Facility) private readonly facilityModel: typeof Facility) {}
  async create(facility: CreateFacilityDto): Promise<Facility> {
    return await this.facilityModel.create({ ...facility });
  }

  async findAll(): Promise<Facility[]> {
    return await this.facilityModel.findAll();
  }

  async findById(id: number): Promise<Facility> {
    const facility = await this.facilityModel.findOne({ where: { id } });
    if (!facility) {
      throw new NotFoundException(`Facility with ID ${id} not found`);
    }
    return facility;
  }

  async update(id: number, updatedFacility: UpdateFacilityDto) {
    const facility = await this.findById(id);
    await facility.update(updatedFacility);
    return facility;
  }

  async remove(id: number): Promise<Facility> {
    const removedFacility = await this.findById(id);
    removedFacility.destroy();
    return removedFacility;
  }
}
