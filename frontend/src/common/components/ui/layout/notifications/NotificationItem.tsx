import React from 'react';
import { Link } from 'react-router-dom';
import { Notification } from 'shared/packages/notification/types/notification';
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

function NotificationItem({ notification }: NotificationItemProps) {
  const [markAsRead] = useMarkAsReadMutation();

  const formattedDate = formatNotificationDate(notification.createdAt);

  return (
    <Link to={`/booking/${notification.refId}`}>
      <div
        onClick={() => {
          markAsRead(notification.id);
        }}
        className='py-4 relative'
      >
        <p className='text-sm text-grey mb-1'>{formattedDate}</p>
        <p>{notification.content}</p>
        {notification.isRead === false && (
          <div className='absolute right-1 top-6 h-2 aspect-square bg-green-2 rounded-full'></div>
        )}
      </div>
    </Link>
  );
}

export default NotificationItem;
