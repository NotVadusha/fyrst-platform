import React from 'react';
import { Header } from '../ui/layout/Header/Header';
import { Button } from '../../ui/common/Button';
import styles from './Notifications.module.css';
import NotificationsForm from './NotificationsForm';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/hooks/redux';
import { useGetNotificationsConfigQuery } from 'src/store/reducers/notification-configs/notificationConfigApi';

const Notifications = () => {
  const navigate = useNavigate();
  const handleCreateBookingClick = () => {
    navigate('/booking/create');
  };

  const user = useAppSelector(state => state.user);
  const { data, isFetching } = useGetNotificationsConfigQuery(1);
  console.log(data);

  return (
    <div>
      <Header title='Profile'>
        <div className='flex justify-end space-x-6 w-full'>
          <Button variant='secondary'>Export CVS</Button>
          <Button variant='primary' onClick={handleCreateBookingClick}>
            Create booking
          </Button>
        </div>
      </Header>

      <div className={styles.notificationsContainer}>
        <h6 className={styles.notificationsTitle}>Notifications</h6>
        <p className={styles.notificationsText}>
          Choose type of notifications you want to receive.
        </p>
        <div className={styles.notificationsCard}>
          <NotificationsForm />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
