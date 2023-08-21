import {
  IsOptional,
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsEmail,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  last_name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone_number: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  city: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  birthdate: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  is_confirmed: boolean;
}
