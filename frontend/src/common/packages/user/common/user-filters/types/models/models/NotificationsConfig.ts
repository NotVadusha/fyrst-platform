export interface NotificationsConfig {
  id: number;
  userId: number;
  timecards: boolean;
  bookings: boolean;
  weeklyReport: boolean;
  messenger: boolean;
  paymentSuccess: boolean;
  moneySent: boolean;
}
