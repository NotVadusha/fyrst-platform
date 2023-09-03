import { IsInt, IsOptional, IsDate } from 'class-validator';

export class FindAllDto {
  @IsInt()
  @IsOptional()
  userId?: number;

  @IsDate()
  @IsOptional()
  minDate?: Date;

  @IsDate()
  @IsOptional()
  maxDate?: Date;
}
