import React from 'react';
import { Header } from '../../../common/components/ui/layout/Header/Header';
import styles from './ProfileSecurity.module.css';
import ProfileSecurityForm from './ProfileSecurityForm';

const ProfileSecurity = () => {
  return (
    <>
      <Header title='Profile' />
      <div className={styles.profileSecurityContainer}>
        <div className={styles.profileHeader}>
          <h6 className={styles.profileHeaderTitle}>Security</h6>
          <p className={styles.profileHeaderText}>Here you can change your password.</p>
        </div>
        <ProfileSecurityForm />
      </div>
    </>
  );
};

export default ProfileSecurity;
