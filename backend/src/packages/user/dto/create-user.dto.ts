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
import { AllowNull } from 'sequelize-typescript';

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

  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return null;
    return new Date(value);
  })
  @IsDate()
  birthdate?: Date | null;

  @IsString()
  @IsOptional()
  password?: string;

  @IsBoolean()
  @IsOptional()
  is_confirmed: boolean;

  @IsNumber()
  @IsNotEmpty()
  role_id: number;
}
