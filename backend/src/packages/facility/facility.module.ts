import { Module } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { FacilityController } from './facility.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Facility } from './entities/facility.entity';

@Module({
  imports: [SequelizeModule.forFeature([Facility])],
  controllers: [FacilityController],
  providers: [FacilityService],
  exports: [FacilityService],
})
export class FacilityModule {}
