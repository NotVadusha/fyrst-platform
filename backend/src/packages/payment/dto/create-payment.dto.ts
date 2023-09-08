import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PaymentStatus } from 'shared/payment-status';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  amountPaid: number;

  @IsIn(['Stripe'])
  @IsString()
  @IsNotEmpty()
  type: 'Stripe';

  @IsNumber()
  @IsNotEmpty()
  instapay: number;

  @IsIn(Object.values(PaymentStatus))
  @IsString()
  @IsNotEmpty()
  status: PaymentStatus;

  @IsBoolean()
  @IsNotEmpty()
  approved: boolean;

  @IsNumber()
  @IsNotEmpty()
  timecardId: number;
}
