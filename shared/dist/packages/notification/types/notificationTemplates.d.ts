import { TimecardStatus } from 'timecard-status';
export declare const notificationTemplateBooking: (name: string, status: string) => string;
export declare const notificationTemplateTimecard: (name: string, status: TimecardStatus) => string;
export declare const notificationTemplatePasswordChange: () => string;
export declare const bookingNewUserNotify: (bookingName: string) => string;
export declare const messageNewNotification: (chatName: string) => string;
export declare const paymentApproveNotification: (userName: string) => string;
export declare const successPaymentNotification: (bookingName: string) => string;
