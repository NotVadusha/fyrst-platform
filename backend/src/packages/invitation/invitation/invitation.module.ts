import { Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Invitation } from './entities/invitation.entity';
import { CalendarEventsModule } from 'src/packages/calendar-events/calendar-events.module';

@Module({
  imports: [SequelizeModule.forFeature([Invitation]), CalendarEventsModule],
  controllers: [InvitationController],
  providers: [InvitationService],
})
export class InvitationModule {}
