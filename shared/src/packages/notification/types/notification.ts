import { User } from 'user';

export interface Notification {
  id: number;
  createdAt: Date;
  content: string;
  isRead: boolean;
  recipientId: number;
}
