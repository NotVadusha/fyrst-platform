import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { TimecardStatus } from '../entities/timecard-status';

export class TimecardFiltersDto {
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  approvedAt?: Date;

  @IsOptional()
  @IsNumber()
  approvedBy?: number;

  @IsOptional()
  @IsEnum(TimecardStatus)
  status?: TimecardStatus;

  @IsOptional()
  @IsNumber()
  createdBy?: number;
}
