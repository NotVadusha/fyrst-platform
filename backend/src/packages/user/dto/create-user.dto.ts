import {
  IsOptional,
  IsString,
  IsDate,
  IsBoolean,
  IsNotEmpty,
  IsEmail,
  IsNumber,
} from 'class-validator';
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
  @IsNotEmpty()
  is_confirmed: boolean;

  @IsNumber()
  @IsNotEmpty()
  role_id: number;
}
