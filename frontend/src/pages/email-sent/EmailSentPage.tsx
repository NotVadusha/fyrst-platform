import React, { useEffect } from 'react';
import AuthWrapper from 'src/components/AuthWrapper/AuthWrapper';
import imageSent from '../../assets/imageSent.png';
import { Button } from 'src/ui/common/Button';
import { resetPasswordApi } from 'src/store/reducers/user/resetPasswordApi';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { useNavigate } from 'react-router-dom';
import { setEmail } from 'src/store/reducers/reset-password.store';

const EmailSentPage = () => {
  const [forgot, { error }] = resetPasswordApi.useLazyForgotQuery();
  const email = useAppSelector(state => state.resetPassword.email);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!email) navigate('/', { replace: true });
    return () => {
      dispatch(setEmail(null));
    };
  }, []);

  const handleClick = async () => {
    if (email)
      forgot({
        email: email,
      });
  };

  return (
    <AuthWrapper image={imageSent}>
      <div className='flex flex-col w-[450px]'>
        <h1 className='text-h3 text-black font-bold mb-4'>The link has been sent!</h1>

        <p className='text-body-default text-dark-grey font-semibold mb-8'>
          Please check you email and follow the link we have sent you to reset a password.
        </p>

        <a className='mb-6' href='/auth/signin'>
          <Button className='w-full' variant='primary' size='default'>
            Sign in
          </Button>
        </a>

        <p className='text-body-default text-dark-grey font-semibold mb-8'>
          Don’t receive the link?{' '}
          <span className='text-blue cursor-pointer' onClick={handleClick}>
            Resend.
          </span>
        </p>
      </div>
    </AuthWrapper>
  );
};

export default EmailSentPage;
