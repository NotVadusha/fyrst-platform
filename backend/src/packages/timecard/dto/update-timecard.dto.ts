import { PartialType } from '@nestjs/mapped-types';
import { CreateTimecardDto } from './create-timecard.dto';
import { IsNumber, IsDate, IsOptional, IsEnum } from 'class-validator';
import { TimecardStatus } from '../entities/timecard-status';

export class UpdateTimecardDto extends PartialType(CreateTimecardDto) {
  @IsOptional()
  @IsNumber()
  approvedBy?: number;

  @IsOptional()
  @IsDate()
  approvedAt?: Date;

  @IsOptional()
  @IsEnum(TimecardStatus)
  status?: TimecardStatus;
}
