import React, { useMemo } from 'react';
import { Notification } from 'shared/packages/notification/types/notification';
import NotificationItem from './NotificationItem';
import { hr } from 'date-fns/locale';

export interface NotificationsListProps {
  notifications: Notification[];
  dividerIndex: number;
}

function NotificationsList({ notifications, dividerIndex }: NotificationsListProps) {
  return (
    <>
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
    </>
  );
}

export default NotificationsList;
