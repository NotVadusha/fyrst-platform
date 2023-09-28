import { Payment } from '../models/Payment.model';

export interface UpdatePaymentDto {
  id: number;
  body: Partial<Payment>;
}
