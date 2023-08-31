import { IsOptional, IsString } from 'class-validator';

export class UserFiltersDto {
  @IsOptional()
  @IsString()
  currentPage?: number;

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
  @IsString()
  is_confirmed?: string;

  @IsOptional()
  @IsString()
  birthdate?: string;
}
