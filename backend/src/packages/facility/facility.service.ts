import { Injectable } from '@nestjs/common';
import { FacilityDto } from './dto/facility.dto';

import { InjectModel } from '@nestjs/sequelize';
import { Facility } from './entities/facility.entity';

@Injectable()
export class FacilityService {
  constructor(@InjectModel(Facility) private readonly facilityModel: typeof Facility) {}
  async create(facility: FacilityDto): Promise<Facility> {
    return await this.facilityModel.create({ ...facility });
  }

  async findAll(): Promise<Facility[]> {
    return await this.facilityModel.findAll();
  }

  async findById(id: number): Promise<Facility> {
    return await this.facilityModel.findOne({ where: { id }, rejectOnEmpty: true });
  }

  async update(id: number, updatedFacility: FacilityDto) {
    const facility = await this.findById(id);
    Object.assign(facility, updatedFacility);
    return facility.save();
  }

  async remove(id: number): Promise<Facility> {
    const removedFacility = await this.findById(id);
    removedFacility.destroy();
    return removedFacility;
  }
}
