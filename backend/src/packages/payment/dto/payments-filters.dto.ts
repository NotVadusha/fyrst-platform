import { Type } from 'class-transformer';
import { IsOptional, IsDate, IsNumber } from 'class-validator';

export class PaymentsFiltersDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  worker?: number;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  minDate?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  maxDate?: Date;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  limit? = Number.MAX_SAFE_INTEGER;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  offset? = 0;
}
