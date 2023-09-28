import React from 'react';
import { Header } from '../../common/components/ui/layout/Header/Header';
import { Button } from '../../common/components/ui/common/Button';
import styles from './NotificationsSettings.module.css';
import NotificationsForm from './NotificationsSettingsForm';
import { useNavigate } from 'react-router-dom';

const NotificationsSettings = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header title='Profile' />

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

export default NotificationsSettings;
