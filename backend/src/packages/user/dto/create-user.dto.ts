import { IsOptional, IsString, IsDate, IsBoolean, IsNotEmpty, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  phone_number?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsOptional()
  birthdate?: Date;

  @IsString()
  @IsOptional()
  password?: string;

  @IsBoolean()
  @IsOptional()
  is_confirmed?: boolean;
}
