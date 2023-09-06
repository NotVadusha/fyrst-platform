import React from 'react';
import { Link } from 'react-router-dom';
import {
  Notification,
  NotificationType,
  NotificationTypeRoutes,
} from 'shared/packages/notification/types/notification';
import { useMarkAsReadMutation } from 'src/common/store/api/packages/notifications/notificationsApi';

function formatNotificationDate(date: Date) {
  const today = new Date();

  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return 'Today';
  }

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  return `${day}.${month}.${year}`;
}

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
  }
}

function NotificationItem({ notification }: NotificationItemProps) {
  const [markAsRead] = useMarkAsReadMutation();

  // const formattedDate = formatNotificationDate(notification.createdAt);

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
        <p className='text-sm text-grey mb-1'>
          {notification.createdAt?.toLocaleDateString ?? 'Today'}
        </p>
        <p>{notification.content}</p>
        {notification.isRead === false && (
          <div className='absolute right-1 top-6 h-2 aspect-square bg-green-2 rounded-full'></div>
        )}
      </div>
    </Link>
  );
}

export default NotificationItem;
