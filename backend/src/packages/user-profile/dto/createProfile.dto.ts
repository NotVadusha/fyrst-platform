import { IsArray, IsOptional, IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProfileDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsArray()
  @IsString({ each: true })
  languages?: string[];

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  education?: string;

  @IsString()
  @IsNotEmpty()
  sex?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  stripeAccountId?: string;
}
