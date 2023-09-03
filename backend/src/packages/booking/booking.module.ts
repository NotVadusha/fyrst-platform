import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { UserModule } from '../user/user.module';
import { FacilityModule } from '../facility/facility.module';
import { NotificationModule } from '../notification/notification.module';
import { Notification } from '../notification/entities/notification.entity';
import { NotificationGateway } from '../websocket/notification.gateway';

@Module({
  imports: [
    SequelizeModule.forFeature([Booking, Notification]),
    UserModule,
    FacilityModule,
    NotificationModule,
  ],
  controllers: [BookingController],
  providers: [BookingService, NotificationGateway, Logger],
  exports: [BookingService, Logger],
})
export class BookingModule {}
