import React from 'react';
import AuthWrapper from 'src/common/components/AuthWrapper/AuthWrapper';
import resetImage from '../../assets/resetimage.png';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from 'src/common/components/ui/common/TextInput/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'src/common/components/ui/common/Button';
import { resetPasswordApi } from 'src/common/store/reducers/user/resetPasswordApi';
import { forgotSchema } from 'src/common/lib/validation-schemas/authentication/forgot';
import { useAppDispatch } from 'src/common/hooks/redux';
import { setEmail } from 'src/common/store/reducers/reset-password.store';

type ForgotInputs = yup.InferType<typeof forgotSchema>;

const ForgotPage = () => {
  const [forgot, { isLoading, error }] = resetPasswordApi.useLazyForgotQuery();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm<ForgotInputs>({
    resolver: yupResolver(forgotSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (data: ForgotInputs) => {
    forgot(data)
      .unwrap()
      .then(() => {
        dispatch(setEmail(data.email));
        navigate('/auth/forgot/email-sended');
      })
      .catch(() => console.log(error));
  };

  return (
    <AuthWrapper image={resetImage}>
      <div className='flex flex-col w-[450px]'>
        <h1 className='xl:text-h2 text-h3 text-black font-bold mb-4'>Forgot Password</h1>

        <p className='text-body-default text-dark-grey font-semibold mb-6'>
          Send a link to your email to reset your password
        </p>

        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col items-center gap-8 [&>div]:w-full'
          >
            <TextInput control={control} name='email' label='Email' type='text' disabled={false} />

            <Button
              className='w-full'
              variant='primary'
              size='default'
              type='submit'
              disabled={isLoading}
            >
              Send reset link
            </Button>
          </form>
        </FormProvider>
      </div>
    </AuthWrapper>
  );
};

export default ForgotPage;
