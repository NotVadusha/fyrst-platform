export interface Notification {
    id: number;
    createdAt: Date;
    content: string;
    isRead: boolean;
    recipientId: number;
    type: NotificationType;
    refId: number;
}
export declare enum NotificationType {
    Bookings = "bookings",
    Timecards = "timecards",
    Payments = "payments",
    WeeklyReport = "weeklyReport",
    Messenger = "messenger"
}
export declare const NotificationTypeRoutes: Record<NotificationType, string>;
export interface CreateNotificationDto {
    content: string;
    recipientId: number;
}
