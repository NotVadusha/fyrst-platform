import { PartialType } from '@nestjs/mapped-types';
import { CreateTimecardDto } from './create-timecard.dto';
import { IsNumber, IsDate, IsOptional, IsEnum } from 'class-validator';
import { TimecardStatus } from 'shared/timecard-status';
import { Type } from 'class-transformer';

export class UpdateTimecardDto extends PartialType(CreateTimecardDto) {
  @IsOptional()
  @IsNumber()
  approvedBy?: number;

  @Type(() => Date)
  @IsOptional()
  @IsDate()
  approvedAt?: Date;

  @IsOptional()
  @IsEnum(TimecardStatus)
  status?: TimecardStatus;
}
