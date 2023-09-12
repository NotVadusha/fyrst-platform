import { Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Invitation } from './entities/invitation.entity';
import { CalendarEventsModule } from 'src/packages/calendar-events/calendar-events.module';
import { UserModule } from 'src/packages/user/user.module';
import { BookingModule } from 'src/packages/booking/booking.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Invitation]),
    CalendarEventsModule,
    BookingModule,
    UserModule,
  ],
  controllers: [InvitationController],
  providers: [InvitationService],
})
export class InvitationModule {}
