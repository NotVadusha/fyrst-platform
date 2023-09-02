import * as yup from 'yup';

export const notificationsSchema = yup.object({
  id: yup.number(),
  userId: yup.number(),
  bookings: yup.boolean(),
  timecards: yup.boolean(),
  paymentSuccess: yup.boolean(),
  passwordChange: yup.boolean(),
  weeklyReport: yup.boolean(),
  moneySent: yup.boolean(),
});
