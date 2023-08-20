import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Timecard } from './entities';
import { timecardRepoProvider, timecardServiceProvider } from './providers';

@Module({
  imports: [SequelizeModule.forFeature([Timecard])],
  providers: [timecardRepoProvider, timecardServiceProvider],
})
export class TimecardModule {}
