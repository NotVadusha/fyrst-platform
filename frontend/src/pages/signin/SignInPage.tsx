import React, { useEffect } from 'react';
import AuthWrapper from 'src/components/AuthWrapper/AuthWrapper';
import authImage from '../../assets/authimage.png';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { FormProvider, useForm, useFormState } from 'react-hook-form';
import TextInput from 'src/components/ui/common/TextInput/TextInput';
import { PasswordInput } from 'src/components/ui/common/PasswordInput/PasswordInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'src/ui/common/Button';
import { ReactComponent as GoogleLogo } from '../../icons/google.svg';
import { authApi } from 'src/store/services';
import { loginSchema } from 'src/lib/validations/login';

type LoginInputs = yup.InferType<typeof loginSchema>;

const SignInPage = () => {
  const [login, { isLoading, error, data }] = authApi.useLoginMutation();

  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<LoginInputs>({
    resolver: yupResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const methods = useForm();

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
    window.location.assign(`${process.env.REACT_APP_BACKEND_URL}/auth/google`);
  };

  useEffect(() => {
    if (data) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      navigate('/');
    }
  }, [data]);

  const { errors } = useFormState({ control });

  return (
    <AuthWrapper
      image={authImage}
      text='Finding the right candidate has never been easier! A few clicks and the deal is ready.'
    >
      <div className='flex flex-col gap-10 w-[450px]'>
        <h1 className='2xl:text-h1 xl:text-h2 text-h3 text-black font-bold mb-4'>
          Welcome back
          <br />
          on <span className='text-blue'>Fyrst</span>
        </h1>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col items-center gap-6 [&>div]:w-full'
          >
            <TextInput control={control} name='email' label='Email' type='text' disabled={false} />
            <PasswordInput control={control} name='password' label='Password' />

            <a className='text-dark-grey text-body-small font-semibold hover:cursor-pointer decoration-transparent self-start'>
              Forgot password?
            </a>

            <Button className='w-full' type='submit' disabled={isLoading}>
              Sign in
            </Button>
          </form>
        </FormProvider>
        <Button className='w-full flex items-center gap-2' type='button' onClick={handleClick}>
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