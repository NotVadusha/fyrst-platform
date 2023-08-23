import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([Booking]), UserModule],
  controllers: [BookingController],
  providers: [BookingService, Logger],
  exports: [BookingService, Logger],
})
export class BookingModule {}