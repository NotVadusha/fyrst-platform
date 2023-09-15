import { IsNumber } from 'class-validator';

export class CreateTimecardDto {
  @IsNumber()
  bookingId: number;

  @IsNumber()
  createdBy: number;

  @IsNumber()
  hoursWorked: number;

  @IsNumber()
  lunchHours: number;
}
