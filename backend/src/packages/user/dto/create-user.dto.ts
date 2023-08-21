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
  @IsNotEmpty()
  city: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  birthdate: Date;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  is_confirmed: boolean;
}
