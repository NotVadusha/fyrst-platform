import { Type } from 'class-transformer';
import { IsNumber, IsDate } from 'class-validator';

export class TotalPaymentsStatisticsDto {
  @Type(() => Number)
  @IsNumber()
  facilityId: number;

  @Type(() => Date)
  @IsDate()
  startDate: Date;
}

export class TotalPaymentsStatisticsReponseDto {
  @IsNumber()
  averageWorkers: number;
}
