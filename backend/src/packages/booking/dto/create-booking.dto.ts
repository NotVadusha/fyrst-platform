import {
  IsDateString,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

class CreateBookingDto {
  @IsNotEmpty()
  @IsIn(['pending', 'accepted', 'rejected', 'canceled', 'completed'])
  readonly status: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly numberOfPositions: number;

  @IsNotEmpty()
  @IsNumber()
  readonly facilitiesRate: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly createdBy: number;

  @IsNotEmpty()
  @IsString()
  readonly sex: string;

  @IsNotEmpty()
  @IsInt()
  @Min(18)
  readonly age: number;

  @IsNotEmpty()
  @IsString()
  readonly education: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly positionsAvailable: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly workingHours: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  readonly pricePerHour: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly notes: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly facilityId: number;
  @IsNotEmpty()
  @IsDateString()
  readonly startDate: Date;
  @IsNotEmpty()
  @IsDateString()
  readonly endDate: Date;
  @IsNotEmpty()
  @IsString()
  employersName: string;
}

export { CreateBookingDto };
