import { Type } from 'class-transformer';
import { IsOptional, IsDate, IsNumber } from 'class-validator';

export class FindAllDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  userId?: number;

  @IsDate()
  @IsOptional()
  minDate?: Date;

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
