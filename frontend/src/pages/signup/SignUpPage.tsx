import React from 'react';
import AuthWrapper from 'src/components/AuthWrapper/AuthWrapper';
import authImage from '../../assets/authimage.png'
import * as yup from 'yup'
import { FormProvider, useForm, useFormState } from 'react-hook-form';
import TextInput from 'src/components/ui/common/TextInput/TextInput';
import { PasswordInput } from 'src/components/ui/common/PasswordInput/PasswordInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema } from 'src/lib/validations/registration';
import { FormField } from 'src/components/ui/common/Form';
import { Button } from 'src/ui/common/Button';
import GoogleLogo from '../../icons/google.svg';
import { authApi } from 'src/store/services';
import { useNavigate } from 'react-router-dom';

type RegistrationInputs = yup.InferType<typeof registrationSchema>;

const SignUpPage = () => {
  const [registration, {isLoading, error}] = authApi.useRegistrationMutation()

  const navigate = useNavigate()

  const { control, handleSubmit } = useForm<RegistrationInputs>({
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
  });

  const methods = useForm()
  
  const onSubmit = async (data: RegistrationInputs) => {
    const body = {
      first_name: data.fullname.split(' ')[0],
      last_name: data.fullname.split(' ')[1],
      email: data.email,
      password: data.password
    }

    registration(body)
      .unwrap()
      .then(() => navigate('/auth/signin'))
      .catch(() => console.log(error))
  }

  const { errors } = useFormState({control})
  
  return (
    <AuthWrapper
      image={authImage}
      text='Finding the right candidate has never been easier! A few clicks and the deal is ready.'
    >
      <div className='flex flex-col gap-6 w-[450px]'>
        <h1 className='2xl:text-h1 xl:text-h2 text-h3 text-black font-bold mb-4'>Register now<br/>on <span className='text-blue'>Fyrst</span></h1>
        
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-6'>
            <TextInput 
              control={control}
              name='fullname'
              label='Full name'
              type='text'
              disabled={false}
            />
            <TextInput 
              control={control}
              name='email'
              label='Email'
              type='text'
              disabled={false}
            />
            <FormField 
              control={control}
              name='password'
              render={({field}) => (
                <PasswordInput 
                  id='password-input'
                  label='Password'
                  error={errors.password?.message}
                  value={field.value}
                  setValue={field.onChange}
                />
              )}
            />
            <FormField 
              control={control}
              name='confirmPassword'
              render={({field}) => (
                <PasswordInput 
                  id='confirm-password-input'
                  label='Confirm password'
                  error={errors.confirmPassword?.message}
                  value={field.value}
                  setValue={field.onChange}
                />
              )}
            />

            <Button fullWidth={true} btnType='submit' label='Sign up' type='primary' eventName='submit'  disabled={isLoading}/>
          </form>
        </FormProvider>
        <Button imgSrc={GoogleLogo} fullWidth={true} btnType='button' label='Sign up with Google' type='primary' eventName='google-click'/>
        <p className='text-body-default text-dark-grey font-semibold'>Already have an account? <a href='./signin' className='decoration-transparent text-blue hover:cursor-pointer'>Sign in now.</a></p>
      </div>
    </AuthWrapper>
  );
};

export default SignUpPage;
