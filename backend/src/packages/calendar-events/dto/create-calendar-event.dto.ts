import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCalendarEventDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(['Booking', 'Interview'])
  eventType: string;

  @IsNumber()
  @IsOptional()
  bookingId?: number;

  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  calendarId: number;
}
