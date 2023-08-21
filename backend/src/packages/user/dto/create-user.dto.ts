import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString, IsDate, IsBoolean, IsNotEmpty, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone_number?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  birthdate: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  is_confirmed: boolean;
}
