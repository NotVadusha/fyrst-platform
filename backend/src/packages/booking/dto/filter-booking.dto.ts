import { IsDateString, IsIn, IsNumber, IsOptional } from 'class-validator';

export class FilterBookingDto {
  @IsOptional()
  @IsIn(['pending', 'accepted', 'rejected', 'canceled', 'completed'])
  status: string;

  @IsOptional()
  @IsNumber()
  facilityId: number;

  @IsOptional()
  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsDateString()
  endDate: Date;
}
