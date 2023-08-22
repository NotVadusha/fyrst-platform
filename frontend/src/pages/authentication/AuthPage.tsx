import React from 'react';
import AuthWrapper from 'src/components/ui/AuthWrapper/AuthWrapper';
import authImage from '../../assets/authimage.png'

const AuthPage = () => {
  return (
    <AuthWrapper
      image={authImage}
      text='Finding the right candidate has never been easier! A few clicks and the deal is ready.'
    >
      <div className='flex flex-col gap-10 w-[410px]'>
        <h1 className='text-[4rem] leading-[6.25rem] text-black font-bold'>Register now on <span className='text-blue'>Fyrst</span></h1>
        
      </div>
    </AuthWrapper>
  );
};

export default AuthPage;
