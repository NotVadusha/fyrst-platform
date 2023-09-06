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

export const NotificationTypeRoutes: Record<NotificationType, string> = {
  [NotificationType.Bookings]: '/booking/',
  [NotificationType.Timecards]: '/timecard/',
  [NotificationType.PaymentSuccess]: '/payment-success/',
  [NotificationType.MoneySent]: '/money-sent/',
  [NotificationType.WeeklyReport]: '/weekly-report/',
  [NotificationType.Messenger]: '/chat/',
};
export interface CreateNotificationDto {
  content: string;
  recipientId: number;
}
