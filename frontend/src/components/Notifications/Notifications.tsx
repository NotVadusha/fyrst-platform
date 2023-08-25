import React from 'react';
import { Header } from '../ui/layout/Header/Header';
import { Button } from '../../ui/common/Button';
import styles from './Notifications.module.css';
import NotificationsForm from './NotificationsForm';

const Notifications = () => {
  return (
    <div>
      <Header title='Profile'>
        <div className='flex justify-end space-x-6 w-full'>
          <Button type='secondary' label='Export CVS' />
          <Button type='primary' label='Create booking' />
        </div>
      </Header>

      <div className={styles.notificationsContainer}>
        <h6 className={styles.notificationsTitle}>Notifications</h6>
        <p className={styles.notificationsText}>
          Choose type of notifications you want to recieve.
        </p>
        <div className={styles.notificationsCard}>
          <NotificationsForm />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
