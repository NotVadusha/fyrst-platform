import React, { useEffect, useState } from 'react';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import authImage from 'src/assets/authimage.png';
import { useLocation } from 'react-router-dom';

const VerifyEmailPage = () => {
  const [showTimer, setShowTimer] = useState(false);
  const [seconds, setSeconds] = useState(7);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const domain = queryParams.get('domain');
    if (domain) {
      setShowTimer(true);

      const timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(timer);
        setShowTimer(false);

        window.open(`http://www.${domain}`, '_blank');
      }, 7000);
    }
  }, []);

  return (
    <AuthWrapper image={authImage}>
      <div className='max-w-[410px]'>
        <p className='text-h3 mb-4'>You are almost done!</p>
        <p className='text-dark-grey mb-[24px]'>
          After having verified your email address, you will be returned to Fyrst and will be able
          to log in to your account.
        </p>
        {showTimer && <p className='text-dark-grey'>Redirecting in {seconds} seconds...</p>}
      </div>
    </AuthWrapper>
  );
};

export default VerifyEmailPage;
