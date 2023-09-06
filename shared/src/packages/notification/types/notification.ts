export interface Notification {
  id: number;
  createdAt: Date;
  content: string;
  isRead: boolean;
  recipientId: number;
  type: NotificationType;
  refId: number;
}

export enum NotificationType {
  Bookings = 'bookings',
  Timecards = 'timecards',
  PaymentSuccess = 'paymentSuccess',
  MoneySent = 'moneySent',
  WeeklyReport = 'weeklyReport',
  Messenger = 'messenger',
}

export interface CreateNotificationDto {
  content: string;
  recipientId: number;
}
