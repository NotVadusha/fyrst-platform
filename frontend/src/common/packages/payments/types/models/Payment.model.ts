import { PaymentStatus } from 'shared/payment-status';
import { Timecard } from 'src/common/packages/timecard/types/models/Timecard.model';

export interface Payment {
  id: number;
  stripePaymentId: string;
  amountPaid: number;
  type: string;
  instapay: number;
  status: PaymentStatus;
  approved: boolean;
  timecardId: number;
  createdAt: Date;
  timecard: Partial<Timecard>;
}
