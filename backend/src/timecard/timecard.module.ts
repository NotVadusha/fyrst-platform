import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Timecard } from './entities';
import { timecardRepoProvider, timecardServiceProvider } from './providers';
import { TimecardController } from './timecard.controller';

@Module({
  imports: [SequelizeModule.forFeature([Timecard])],
  providers: [timecardRepoProvider, timecardServiceProvider],
  controllers: [TimecardController],
})
export class TimecardModule {}
