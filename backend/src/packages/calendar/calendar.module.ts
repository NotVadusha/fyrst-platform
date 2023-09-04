import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { Calendar } from './entities/calendar.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from '../user/user.module';

@Module({
  exports: [CalendarService],
  imports: [SequelizeModule.forFeature([Calendar]), UserModule],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
