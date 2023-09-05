import { IsInt, IsOptional, IsDate } from 'class-validator';

export class FindAllDto {
  @IsInt()
  @IsOptional()
  payeeId?: number;

  @IsDate()
  @IsOptional()
  minDate?: Date;

  @IsDate()
  @IsOptional()
  maxDate?: Date;
}
