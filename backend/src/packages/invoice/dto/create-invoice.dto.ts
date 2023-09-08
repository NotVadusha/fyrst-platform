import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaymentStatus } from 'shared/payment-status';

export class CreateInvoiceDto {
  @IsNumber()
  @IsNotEmpty()
  amountPaid: number;

  @IsIn(Object.values(PaymentStatus))
  @IsString()
  @IsNotEmpty()
  status: PaymentStatus;

  @IsNumber()
  @IsOptional()
  path: string;

  @IsNumber()
  @IsNotEmpty()
  timecardId: number;
}
