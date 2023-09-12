import React from 'react';
import { Link } from 'react-router-dom';
import {
  Notification,
  NotificationType,
  NotificationTypeRoutes,
} from 'shared/packages/notification/types/notification';
import { useMarkAsReadMutation } from 'src/common/store/api/packages/notifications/notificationsApi';

export interface NotificationItemProps {
  notification: Notification;
}

function getRoute(type: string) {
  switch (type) {
    case 'bookings':
      return '/booking/';
    case 'timecards':
      return '/timecard/';
    case 'messenger':
      return '/chat/';
    case 'payments':
      return '/payments/';
    case 'moneySent':
      return '/payments/';
  }
}

function NotificationItem({ notification }: NotificationItemProps) {
  const [markAsRead] = useMarkAsReadMutation();

  const notificationRoute: string = NotificationTypeRoutes[notification.type];

  const ref = getRoute(notification.type) ?? notificationRoute;

  return (
    <Link to={`${ref}${notification.refId}`}>
      <div
        onClick={() => {
          markAsRead(notification.id);
        }}
        className='py-4 relative'
      >
        <p>{notification.content}</p>
        {notification.isRead === false && (
          <div className='absolute right-1 top-6 h-2 aspect-square bg-green-2 rounded-full'></div>
        )}
      </div>
    </Link>
  );
}

export default NotificationItem;
