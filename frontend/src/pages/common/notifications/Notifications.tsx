import React, { useMemo } from 'react';
import { ReactComponent as BellIcon } from 'src/assets/icons/bell.svg';
import { Modal } from 'src/common/components/ui/common/Modal/Modal';
import { useAppSelector } from 'src/common/hooks/redux';
import { useGetNotificationsQuery } from 'src/common/store/api/packages/notifications/notificationsApi';

function Notifications() {
  const user = useAppSelector(state => state.user);
  const { data, isLoading } = useGetNotificationsQuery(user?.id ?? 1);
  const memoizedData = useMemo(() => data, [data]);

  console.log(data);

  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <button className=''>
      <BellIcon className='fill-dark-grey' onClick={() => setIsOpen(true)} />
      <Modal open={isOpen} onOpenChange={setIsOpen} title='Notifications'></Modal>
    </button>
  );
}

export default Notifications;
