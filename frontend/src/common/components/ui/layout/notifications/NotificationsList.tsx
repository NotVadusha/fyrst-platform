import React, { useMemo } from 'react';
import { Notification } from 'shared/packages/notification/types/notification';
import NotificationItem from './NotificationItem';

export interface NotificationsListProps {
  notifications: Notification[];
  dividerIndex: number;
}

function NotificationsList({ notifications, dividerIndex }: NotificationsListProps) {
  return (
    <div className='h-[85%] overflow-y-auto'>
      {notifications?.length === 0 ? (
        <div className='text-center pt-4'>No messages</div>
      ) : (
        notifications.map((item, index) => (
          <div key={item.id}>
            <NotificationItem notification={item} />
            {index === dividerIndex - 1 && dividerIndex > 0 && <hr />}
          </div>
        ))
      )}
    </div>
  );
}

export default NotificationsList;
