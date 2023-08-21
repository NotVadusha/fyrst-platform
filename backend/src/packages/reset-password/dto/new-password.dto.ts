import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class NewPasswordDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  new_password: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
