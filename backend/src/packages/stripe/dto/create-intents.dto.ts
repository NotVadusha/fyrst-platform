import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateIntentsDto {
  @IsInt()
  @IsNotEmpty()
  paymentId: number;
}
