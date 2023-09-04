import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BookingsByMonthDto {
  @IsNotEmpty()
  @IsString()
  month: string;

  @IsNumber()
  numberOfBookings: number;
}
