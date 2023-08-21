import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Timecard } from './entities/timecard.entity';
import { TimecardController } from './timecard.controller';
import { TimecardService } from './timecard.service';

@Module({
  imports: [SequelizeModule.forFeature([Timecard])],
  providers: [TimecardService],
  controllers: [TimecardController],
})
export class TimecardModule {}
