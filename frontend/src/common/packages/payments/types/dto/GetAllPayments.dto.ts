import { Payment } from '../models/Payment.model';

export interface GetAllPaymentsDto {
  payments: Payment[];
  total: number;
}
