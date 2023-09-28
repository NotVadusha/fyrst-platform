import { PaymentStatus } from 'shared/payment-status';
import { Timecard } from 'src/common/packages/timecard/types/models/Timecard.model';

export interface Invoice {
  id: number;
  amountPaid: number;
  status: PaymentStatus;
  path?: string;
  timecardId: number;
  timecard: Timecard;
  createdAt: Date;
}
