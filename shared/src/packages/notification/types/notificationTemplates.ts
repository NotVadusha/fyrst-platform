import { TimecardStatus } from 'timecard-status';

export const notificationTemplateBooking = (name: string, status: string) =>
  `Your booking ${name} has been ${status}`;

export const notificationTemplateTimecard = (name: string, status: TimecardStatus) =>
  `Your timecard ${name} has been ${status}`;

export const notificationTemplatePasswordChange = () =>
  `Your password has been changed successfully`;
