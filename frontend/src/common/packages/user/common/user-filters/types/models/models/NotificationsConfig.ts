export interface NotificationsConfig {
  id: number;
  userId: number;
  timecards: boolean;
  bookings: boolean;
  weeklyReport: boolean;
  passwordChange: boolean;
  paymentSuccess: boolean;
  moneySent: boolean;
}
