import React, { useEffect } from 'react';
import AuthWrapper from 'src/pages/authentication/AuthWrapper/AuthWrapper';
import authImage from 'src/assets/authimage.png';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from 'src/common/components/ui/common/Input/common/TextInput/TextInput';
import { PasswordInput } from 'src/common/components/ui/common/Input/common/PasswordInput/PasswordInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'src/common/components/ui/common/Button';
import { ReactComponent as GoogleLogo } from 'src/assets/icons/google.svg';
import { authApi } from 'src/common/store/api/packages/authentication/authApi';
import { loginSchema } from 'src/common/packages/authentication/login/types/validation-schemas/login.validation-schema';
import { useAppDispatch } from 'src/common/hooks/redux';
import { setUser } from 'src/common/store/slices/packages/user/userSlice';
import { toast } from 'src/common/components/ui/common/Toast/useToast';

type LoginInputs = yup.InferType<typeof loginSchema>;

const SignInPage = () => {
  const [login, { isLoading, error, data }] = authApi.useLoginMutation();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const form = useForm<LoginInputs>({
    resolver: yupResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (data: LoginInputs) => {
    try {
      const body = {
        email: data.email,
        password: data.password,
      };

      login(body);
    } catch {
      console.log(error);
    }
  };

  const handleClick = () => {
    window.location.assign(`${process.env.REACT_APP_API_URL}/auth/google`);
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      dispatch(
        setUser({ ...data.userInfo, birthdate: data.userInfo.birthdate?.toString() || undefined }),
      );

      toast({ title: 'Successfully signed in', variant: 'success' });

      navigate('/');
    }
  }, [data]);

  return (
    <AuthWrapper
      image={authImage}
      text='Finding the right candidate has never been easier! A few clicks and the deal is ready.'
    >
      <div className='flex flex-col gap-10 w-[450px] px-5'>
        <h1 className='2xl:text-h1 xl:text-h2 text-h3 text-black font-bold mb-4'>
          Welcome back
          <br />
          on <span className='text-blue'>Fyrst</span>
        </h1>

        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col items-center gap-6 [&>div]:w-full'
          >
            <TextInput control={control} name='email' label='Email' type='text' disabled={false} />
            <PasswordInput control={control} name='password' label='Password' />
            <a
              href='./forgot'
              className='text-dark-grey text-body-small font-semibold hover:cursor-pointer decoration-transparent self-start'
            >
              Forgot password?
            </a>
            <Button className='w-full' type='submit' disabled={isLoading}>
              Sign in
            </Button>
          </form>
        </FormProvider>
        <Button
          variant='tertiary'
          className='w-full flex items-center gap-2'
          type='button'
          onClick={handleClick}
        >
          <GoogleLogo />
          Sign up with Google
        </Button>
        <p className='text-body-default text-dark-grey font-semibold'>
          Don&apos;t have an account yet?{' '}
          <a href='./signup' className='decoration-transparent text-blue hover:cursor-pointer'>
            Register now.
          </a>
        </p>
      </div>
    </AuthWrapper>
  );
};

export default SignInPage;
