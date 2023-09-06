import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Modal } from 'src/common/components/ui/common/Modal/Modal';
import { useAppSelector } from 'src/common/hooks/redux';
import { useGetNotificationsQuery } from 'src/common/store/api/packages/notifications/notificationsApi';
import NotificationsList from './NotificationsList';
import { SocketContext } from 'src/common/config/packages/socket/socket.config';
import { Notification } from 'shared/packages/notification/types/notification';
import { ReactComponent as BellIcon } from 'src/assets/icons/bell.svg';
import { ReactComponent as Arrow } from 'src/assets/icons/arrow-long-left.svg';
import { cva } from 'class-variance-authority';
import { read } from 'fs';

const panelVariants = cva(
  'fixed left-full top-0 bottom-0 w-[420px] p-6 pt-28 bg-white shadow-lg -z-[1] transition-transform',
  {
    variants: {
      open: {
        false: '-translate-x-0',
        true: '-translate-x-full',
      },
    },
  },
);

const getSortedNotifications = (notifications: Notification[]) => {
  const unreadNotifications = notifications.filter(notification => !notification.isRead);
  const readNotifications = notifications.filter(notification => notification.isRead);
  return [unreadNotifications, readNotifications];
};

function Notifications() {
  const user = useAppSelector(state => state.user);
  const socket = useContext(SocketContext);
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useGetNotificationsQuery(user?.id ?? 1);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [dividerIndex, setDividerIndex] = useState(0);

  useEffect(() => {
    if (!data) return;

    const newNotifications = data.map(inputNotification => {
      return {
        ...inputNotification,
        createdAt: new Date(inputNotification.createdAt),
      };
    });
    const [unreadNotifications, readNotifications] = getSortedNotifications(newNotifications);
    setNotifications([...unreadNotifications, ...readNotifications]);
    setDividerIndex(unreadNotifications.length);
  }, [data, user]);

  useEffect(() => {
    socket.on('connection', () => {
      socket.emit('mapping', { userId: user?.id ?? 1 });
    });
    socket.on('notificationCreated', (notification: Notification) => {
      setNotifications(prev => [notification, ...prev]);
    });
    socket.on('notificationIsRead', (updatedNotification: Notification) => {
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === updatedNotification.id ? updatedNotification : notification,
        ),
      );
    });

    return () => {
      if (!socket) return;
      socket.off('connection');
      socket.off('notificationIsRead');
      socket.off('notificationCreated');
    };
  }, [user, socket]);

  return (
    <div className='ml-auto flex items-center'>
      <button className='ml-10 relative'>
        <BellIcon className='leading-none' onClick={() => setIsOpen(prev => !prev)} />
        {dividerIndex > 0 && (
          <div className='absolute right-1 top-1 h-2 aspect-square bg-green-2 rounded-full'></div>
        )}
      </button>
      <div className={panelVariants({ open: isOpen })}>
        <div className='flex justify-center items-center relative pb-8'>
          <button className='absolute left-0 cursor-pointer'>
            <Arrow onClick={() => setIsOpen(false)} />
          </button>
          <h2 className='text-2xl font-semibold text-center'>
            Notifications {dividerIndex > 0 && `(${dividerIndex})`}
          </h2>
        </div>
        <NotificationsList notifications={notifications} dividerIndex={dividerIndex} />
      </div>
    </div>
  );
}

export default Notifications;
