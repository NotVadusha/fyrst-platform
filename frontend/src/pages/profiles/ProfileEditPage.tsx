import React from 'react';
import { ProfileEditForm } from 'src/components/profileEditForm/ProfileEditForm';
const ProfileEditPage = () => {
  return (
    <>
      <div className='bg-white shadow-header'>
        <h1 className='text-dark-grey text-xl py-6 px-8 font-semibold'>Profile</h1>
      </div>
      <div>
        <h2 className='text-dark-grey text-xl pt-10 pb-8 px-20 font-semibold'>Edit Profile</h2>
        <ProfileEditForm />
      </div>
    </>
  );
};

export default ProfileEditPage;
