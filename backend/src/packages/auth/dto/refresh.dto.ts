import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class RefreshDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}
