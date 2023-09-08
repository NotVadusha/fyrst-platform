import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Timecard } from './entities/timecard.entity';
import { TimecardController } from './timecard.controller';
import { TimecardService } from './timecard.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([Timecard]), UserModule],
  providers: [TimecardService],
  controllers: [TimecardController],
  exports: [TimecardService],
})
export class TimecardModule {}
