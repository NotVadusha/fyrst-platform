import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BookingsByMonthResponseDto {
  @IsNotEmpty()
  @IsString()
  month: string;

  @IsNumber()
  numberOfBookings: number;
}
