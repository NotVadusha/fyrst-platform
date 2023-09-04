import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { UserModule } from '../user/user.module';
import { FacilityModule } from '../facility/facility.module';
import { UserProfileModule } from '../user-profile/user-profile.module';
import { RecommendationService } from '../common/recommendation.service';

@Module({
  imports: [SequelizeModule.forFeature([Booking]), UserModule, FacilityModule, UserProfileModule],
  controllers: [BookingController],
  providers: [BookingService, Logger, RecommendationService],
  exports: [BookingService, Logger],
})
export class BookingModule {}
