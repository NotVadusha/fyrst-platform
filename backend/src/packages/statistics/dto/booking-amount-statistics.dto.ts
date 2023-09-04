import { Type } from 'class-transformer';
import { IsNumber, IsDate } from 'class-validator';

export class BookingStatisticsDto {
  @Type(() => Number)
  @IsNumber()
  facilityId: number;

  @Type(() => Date)
  @IsDate()
  startDate: Date;
}

export class BookingStatisticsResponseDto {
  @IsNumber()
  total: number;

  @IsNumber()
  completed: number;

  @IsNumber()
  pending: number;
}
