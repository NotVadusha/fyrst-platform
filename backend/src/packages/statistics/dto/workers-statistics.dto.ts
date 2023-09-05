import { Type } from 'class-transformer';
import { IsNumber, IsDate } from 'class-validator';

export class WorkersStatistcsDto {
  @Type(() => Number)
  @IsNumber()
  facilityId: number;

  @Type(() => Date)
  @IsDate()
  startDate: Date;
}

export class WorkersStatistcsResponseDto {
  @IsNumber()
  averageWorkers: number;

  @IsNumber()
  totalWorkers: number;

  @IsNumber()
  averagePayment: number;
}
