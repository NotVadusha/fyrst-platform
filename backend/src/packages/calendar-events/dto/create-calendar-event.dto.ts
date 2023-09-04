import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCalendarEventDto {
  @IsString()
  @IsNotEmpty()
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
