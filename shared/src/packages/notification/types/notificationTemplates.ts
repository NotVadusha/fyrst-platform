import { TimecardStatus } from 'timecard-status';

export const notificationTemplateBooking = (name: string, status: string) =>
  `Your booking ${name} changed status: ${status}`;

export const notificationTemplateTimecard = (name: string, status: TimecardStatus) =>
  `Your timecard ${name} changed status: ${status}`;

export const notificationTemplatePasswordChange = () =>
  `Your password has been changed successfully`;

export const bookingNewUserNotify = (name: string) => `Booking ${name} have new applicants`;
export const messageNewNotification = (name: string) => `New message in chat ${name}`;
