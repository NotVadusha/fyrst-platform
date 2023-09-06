import React, { useEffect, useState } from 'react';
import AuthWrapper from '../AuthWrapper/AuthWrapper';
import authImage from 'src/assets/authimage.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../../common/components/ui/common/Button';

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showButton, setShowButton] = useState(false);
  const [domain, setDomain] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const foundDomain = queryParams.get('domain');
    if (foundDomain) {
      setDomain(foundDomain);
      setShowButton(true);
    }
  }, []);

  const handleButtonClick = () => {
    window.open(`http://www.${domain}`, '_blank');
    navigate('/auth/verify-email');
  };

  return (
    <AuthWrapper image={authImage}>
      <div className='max-w-[410px]'>
        <p className='text-h3 mb-4'>You are almost done!</p>
        <p className='text-dark-grey mb-[24px]'>
          After having verified your email address, you will be returned to Fyrst and will be able
          to log in to your account.
        </p>
        {showButton && (
          <Button onClick={handleButtonClick} className='w-full'>
            Verify email address
          </Button>
        )}
      </div>
    </AuthWrapper>
  );
};

export default VerifyEmailPage;
