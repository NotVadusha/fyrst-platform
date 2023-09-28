import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaymentStatus } from 'shared/payment-status';

export class CreateTaxDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  percentage: number;

  @IsNumber()
  @IsOptional()
  additionalAmount?: number;

  @IsNumber()
  @IsNotEmpty()
  paymentId: number;
}
