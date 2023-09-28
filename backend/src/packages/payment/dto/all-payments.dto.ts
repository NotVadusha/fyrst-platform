import { Payment } from '../entities/payment.entity';

export class AllPaymentsDto {
  payments: Payment[];
  total: number;
}
