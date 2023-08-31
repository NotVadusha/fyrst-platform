import React from 'react';
import { ProfileEditForm } from 'src/pages/profiles/profileEditForm/ProfileEditForm';
import { Header } from 'src/common/components/ui/layout/Header/Header';

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
