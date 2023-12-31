import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { UserModule } from '../user/user.module';
import { FacilityModule } from '../facility/facility.module';
import { NotificationModule } from '../notification/notification.module';
import { Notification } from '../notification/entities/notification.entity';
import { NotificationService } from '../notification/notification.service';
import { NotificationGateway } from '../websocket/notification.gateway';
import { UserProfileModule } from '../user-profile/user-profile.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Booking]),
    UserModule,
    FacilityModule,
    UserProfileModule,
    NotificationModule,
  ],
  controllers: [BookingController],
  providers: [BookingService, Logger],
  exports: [BookingService, Logger],
})
export class BookingModule {}
