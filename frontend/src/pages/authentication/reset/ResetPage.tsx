import React, { useEffect } from 'react';
import AuthWrapper from 'src/pages/authentication/AuthWrapper/AuthWrapper';
import resetImage from 'src/assets/resetimage.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'src/common/components/ui/common/Button';
import { resetPasswordApi } from 'src/common/store/api/packages/reset-password/resetPasswordApi';
import { resetPasswordSchema } from 'src/common/packages/authentication/password/types/validation-schemas/reset-password.validation-schema';
import { PasswordInput } from 'src/common/components/ui/common/Input/common/PasswordInput/PasswordInput';
import { useAppDispatch } from 'src/common/hooks/redux';
import { setEmail } from 'src/common/store/slices/packages/reset-password/resetPasswordSlice';

type ResetInputs = yup.InferType<typeof resetPasswordSchema>;

const ResetPage = () => {
  const [reset, { isLoading, error }] = resetPasswordApi.useResetMutation();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const form = useForm<ResetInputs>({
    resolver: yupResolver(resetPasswordSchema),
    mode: 'onTouched',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (!searchParams.get('id') || !searchParams.get('token')) navigate('/', { replace: true });
  }, []);

  const { control, handleSubmit } = form;

  const onSubmit = async (data: ResetInputs) => {
    const body = {
      new_password: data.password,
      id: Number(searchParams.get('id')),
      token: searchParams.get('token') || '',
    };

    reset(body)
      .unwrap()
      .then(() => {
        dispatch(setEmail(null));
        navigate('/auth/signin', { replace: true });
      })
      .catch(() => console.log(error));
  };

  return (
    <AuthWrapper image={resetImage}>
      <div className='flex flex-col w-[450px]'>
        <h1 className='xl:text-h2 text-h3 text-black font-bold mb-4'>Reset Password</h1>

        <p className='text-body-default text-dark-grey font-semibold mb-6'>
          Please enter your password
        </p>

        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col items-center gap-8 [&>div]:w-full'
          >
            <PasswordInput control={control} name='password' label='Password' />
            <PasswordInput control={control} name='confirmPassword' label='Confirm password' />

            <Button
              className='w-full'
              variant='primary'
              size='default'
              type='submit'
              disabled={isLoading}
            >
              Confirm new password
            </Button>
          </form>
        </FormProvider>
      </div>
    </AuthWrapper>
  );
};

export default ResetPage;
