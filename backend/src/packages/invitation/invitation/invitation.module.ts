import { Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Invitation } from './entities/invitation.entity';

@Module({
  imports: [SequelizeModule.forFeature([Invitation])],
  controllers: [InvitationController],
  providers: [InvitationService],
})
export class InvitationModule {}
