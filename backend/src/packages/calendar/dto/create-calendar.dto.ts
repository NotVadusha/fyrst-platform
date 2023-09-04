import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCalendarDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
