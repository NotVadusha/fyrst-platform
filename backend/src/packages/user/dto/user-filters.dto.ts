import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserFiltersDto {
  @IsString()
  currentPage: string;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsBoolean()
  is_confirmed?: boolean;

  @IsOptional()
  @IsString()
  birthdate?: string;
}