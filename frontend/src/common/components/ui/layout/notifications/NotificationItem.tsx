import React from 'react';
import { Link } from 'react-router-dom';
import {
  Notification,
  NotificationTypeRoutes,
} from 'shared/packages/notification/types/notification';
import { useMarkAsReadMutation } from 'src/common/store/api/packages/notifications/notificationsApi';

export interface NotificationItemProps {
  notification: Notification;
}

function NotificationItem({ notification }: NotificationItemProps) {
  const [markAsRead] = useMarkAsReadMutation();

  const notificationRoute: string = NotificationTypeRoutes[notification.type];

  return (
    <Link to={`${notificationRoute}${notification.refId}`}>
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
