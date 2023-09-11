import React from 'react';
import { ProfileEditForm } from 'src/pages/profiles/profileEditForm/ProfileEditForm';
import { Header } from 'src/common/components/ui/layout/Header/Header';
import { StripeConnection } from './StripeConnection';

const ProfileEditPage = () => {
  return (
    <>
      <Header title='Profile'></Header>
      <div className='mx-4 md:mx-16 mb-8'>
        <h6 className='text-dark-grey text-h6 mt-[40px] pb-8 font-semibold'>Edit Profile</h6>
        <ProfileEditForm />
      </div>

      <div className='mx-4 md:mx-16 mb-8'>
        <h6 className='text-dark-grey text-h6 mt-[40px] pb-8 font-semibold'>Stripe account</h6>
        <StripeConnection />
      </div>
    </>
  );
};

export default ProfileEditPage;
