import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBookingEventDto {
  @IsNumber()
  @IsNotEmpty()
  bookingId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
