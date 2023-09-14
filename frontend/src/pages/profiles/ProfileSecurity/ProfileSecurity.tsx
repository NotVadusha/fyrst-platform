import React, { useEffect, useState } from 'react';
import { Header } from '../../../common/components/ui/layout/Header/Header';
import styles from './ProfileSecurity.module.css';
import ProfileSecurityForm from './ProfileSecurityForm';
import { StripeConnection } from './StripeConnection';
import jwtDecode from 'jwt-decode';
import { JWTPayload } from 'shared/packages/authentication/types/JWTPayload';

const ProfileSecurity = () => {
  const [changePasswordFormVisibility, setChangePasswordFormVisibility] = useState<boolean>();
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      const payload = jwtDecode<JWTPayload>(accessToken);
      setChangePasswordFormVisibility(!payload.isGoogle);
    }
  }, []);

  return (
    <>
      <Header title='Profile' />
      {changePasswordFormVisibility ? (
        <div className={styles.profileSecurityContainer}>
          <div className={styles.profileHeader}>
            <h6 className={styles.profileHeaderTitle}>Security</h6>
            <p className={styles.profileHeaderText}>Here you can change your password.</p>
          </div>
          <ProfileSecurityForm />
        </div>
      ) : null}
      <div className='mx-4 md:mx-16 my-10'>
        <h6 className='text-dark-grey text-h6 pb-8 font-semibold'>Stripe account</h6>
        <StripeConnection />
      </div>
      <div className='mx-4 md:mx-16 mb-10'>
        <h6 className='text-dark-grey text-h6 pb-8 font-semibold'>Stripe account</h6>
        <StripeConnection />
      </div>
      <div className='mx-4 md:mx-16 mb-10'>
        <h6 className='text-dark-grey text-h6 pb-8 font-semibold'>Stripe account</h6>
        <StripeConnection />
      </div>
    </>
  );
};

export default ProfileSecurity;
