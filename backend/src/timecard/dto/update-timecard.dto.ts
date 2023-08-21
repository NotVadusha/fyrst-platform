import { PartialType } from '@nestjs/mapped-types';
import { CreateTimecardDto } from './create-timecard.dto';
import { IsNumber, IsDate, IsOptional } from 'class-validator';

export class UpdateTimecardDto extends PartialType(CreateTimecardDto) {
  @IsOptional()
  @IsNumber()
  approvedBy?: number;

  @IsOptional()
  @IsDate()
  approvedAt?: Date;
}
