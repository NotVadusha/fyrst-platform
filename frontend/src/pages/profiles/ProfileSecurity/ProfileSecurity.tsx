import React from 'react';
import { Header } from '../../../common/components/ui/layout/Header/Header';
import styles from './ProfileSecurity.module.css';
import ProfileSecurityForm from './ProfileSecurityForm';
import { StripeConnection } from './StripeConnection';

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
      <div className='mx-4 md:mx-16 mb-10'>
        <h6 className='text-dark-grey text-h6 pb-8 font-semibold'>Stripe account</h6>
        <StripeConnection />
      </div>
    </>
  );
};

export default ProfileSecurity;
