import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WorkersByMonthResponseDto {
  @IsNotEmpty()
  @IsString()
  month: string;

  @IsNumber()
  numberOfWorkers: number;
}
