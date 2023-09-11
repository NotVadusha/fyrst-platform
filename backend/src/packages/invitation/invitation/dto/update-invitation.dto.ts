import { PartialType } from '@nestjs/mapped-types';
import { CreateInvitationDto } from './create-invitation.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { InvitationStatus } from 'shared/invitation-status';

export class UpdateInvitationDto extends PartialType(CreateInvitationDto) {
  @IsOptional()
  @IsEnum(InvitationStatus)
  status?: InvitationStatus;
}
