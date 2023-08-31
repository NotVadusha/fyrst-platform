export interface UpdateNotificationsConfigDto {
  userId: number;
  bookings: boolean;
  timecards?: boolean;
  weeklyReport?: boolean;
  passwordChange?: boolean;
  paymentSuccess?: boolean;
  moneySent?: boolean;
}
