import { Type } from 'class-transformer';
import { IsNumber, IsDate } from 'class-validator';

export class AverageWorkersStatistcsDto {
  @Type(() => Number)
  @IsNumber()
  facilityId: number;

  @Type(() => Date)
  @IsDate()
  startDate: Date;
}

export class AverageWorkersStatistcsResponseDto {
  @IsNumber()
  averageWorkers: number;
}
