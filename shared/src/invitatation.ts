import { InvitationStatus } from 'invitation-status';
import { User } from 'user';

export interface Invitation {
  id: number;
  employee: User;
  organizer: User;
  booking: any;
  date: string;
  time: Date;
  status: InvitationStatus;
  meetingId: string;
}
