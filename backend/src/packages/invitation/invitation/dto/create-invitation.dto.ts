import { IsNotEmpty, IsDateString, IsString, IsArray, IsOptional, IsNumber } from 'class-validator';

export class CreateInvitationDto {
  @IsNotEmpty()
  @IsString()
  readonly time: string;

  @IsDateString()
  @IsNotEmpty()
  readonly date: Date;

  @IsNumber()
  @IsNotEmpty()
  readonly employeeId: number;

  @IsNumber()
  @IsNotEmpty()
  readonly bookingId: number;
}
