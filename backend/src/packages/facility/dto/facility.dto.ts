import { IsNotEmpty, IsString } from 'class-validator';

export class FacilityDto {
  @IsNotEmpty()
  @IsString()
  logo: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  city: string;
  @IsNotEmpty()
  @IsString()
  address: string;
  @IsNotEmpty()
  @IsString()
  description: string;
}
