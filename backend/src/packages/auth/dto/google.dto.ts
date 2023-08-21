import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class GoogleDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
