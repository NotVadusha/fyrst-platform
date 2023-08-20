import { IsDate, IsNumber } from 'class-validator';

export class CreateTimecardDto {
  @IsNumber()
  bookingId: number;

  @IsDate()
  createdAt: Date;

  @IsNumber()
  createdBy: number;
}
