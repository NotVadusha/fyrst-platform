import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { TimecardStatus } from 'shared/timecard-status';

export class TimecardFiltersDto {
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @Type(() => Date)
  @IsOptional()
  @IsDate()
  approvedAt?: Date | null;

  @IsOptional()
  @IsEnum(TimecardStatus)
  status?: TimecardStatus;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  limit? = Number.MAX_SAFE_INTEGER;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  offset? = 0;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  createdBy?: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  bookingId?: number;
}
