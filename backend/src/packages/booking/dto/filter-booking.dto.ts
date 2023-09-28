import { Type } from 'class-transformer';
import { IsDateString, IsIn, IsInt, IsOptional } from 'class-validator';

export class FilterBookingDto {
  @IsOptional()
  @IsIn(['pending', 'accepted', 'rejected', 'canceled', 'completed'])
  status: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  facilityId: number;

  @IsOptional()
  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsDateString()
  endDate: Date;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset?: number;
}
