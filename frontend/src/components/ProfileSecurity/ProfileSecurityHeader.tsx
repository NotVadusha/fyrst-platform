import React from 'react';
import styles from './ProfileSecurity.module.css';

const ProfileSecurityHeader = () => {
  return (
    <div className={styles.profileHeader}>
      <h6 className={styles.profileHeaderTitle}>Security</h6>
      <p>Here you can change your password.</p>
    </div>
  );
};

export default ProfileSecurityHeader;
