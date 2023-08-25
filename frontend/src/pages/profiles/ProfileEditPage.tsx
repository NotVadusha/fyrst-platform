import React from 'react';
import { ProfileEditForm } from 'src/components/profileEditForm/ProfileEditForm';
import { Header } from 'src/components/ui/layout/Header/Header';

const ProfileEditPage = () => {
  return (
    <>
      <Header title='Profile'></Header>
      <div>
        <h5 className='text-dark-grey text-xl pt-10 pb-8 px-20 font-semibold'>Edit Profile</h5>
        <ProfileEditForm />
      </div>
    </>
  );
};

export default ProfileEditPage;
