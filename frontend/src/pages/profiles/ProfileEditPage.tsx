import React from 'react';
import { ProfileEditForm } from 'src/pages/profiles/profileEditForm/ProfileEditForm';
import { Header } from 'src/common/components/ui/layout/Header/Header';
const ProfileEditPage = () => {
  return (
    <>
      <Header title='Profile'></Header>
      <div className='mx-4 md:mx-16 mb-8'>
        <h6 className='text-dark-grey text-h6 mt-[40px] pb-8 font-semibold'>Edit Profile</h6>
        <ProfileEditForm />
      </div>
    </>
  );
};

export default ProfileEditPage;
