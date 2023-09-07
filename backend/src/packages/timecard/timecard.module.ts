import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Timecard } from './entities/timecard.entity';
import { TimecardController } from './timecard.controller';
import { TimecardService } from './timecard.service';
import { NotificationModule } from '../notification/notification.module';
import { Notification } from '../notification/entities/notification.entity';
import { NotificationService } from '../notification/notification.service';
import { NotificationGateway } from '../websocket/notification.gateway';

@Module({
  imports: [SequelizeModule.forFeature([Timecard]), NotificationModule],
  providers: [TimecardService],
  controllers: [TimecardController],
})
export class TimecardModule {}
