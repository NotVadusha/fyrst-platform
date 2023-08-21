import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Timecard } from './entities';
import { TimecardController } from './timecard.controller';
import { TimecardRepository } from './timecard.repository';
import { TimecardService } from './timecard.service';

@Module({
  imports: [SequelizeModule.forFeature([Timecard])],
  providers: [TimecardRepository, TimecardService],
  controllers: [TimecardController],
})
export class TimecardModule {}
