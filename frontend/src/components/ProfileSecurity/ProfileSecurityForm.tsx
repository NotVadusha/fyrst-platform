import React from 'react';
import { Form } from '../ui/common/Form';
import { PasswordInput } from '../ui/common/PasswordInput/PasswordInput';
import { Button } from '../../ui/common/Button';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './ProfileSecurity.module.css';

const validationSchema = yup.object().shape({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup
    .string()
    .required('Password is required')
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+).{8,24}$/, {
      message:
        'Password must contain 8-24 characters, at least one uppercase, and at least one special character.',
      excludeEmptyString: true,
    }),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Password confirmation is required'),
});

const ProfileSecurityForm = () => {
  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={styles.profileSecuriyCard}>
          <div className={styles.inputContainer}>
            <PasswordInput
              control={form.control}
              name='currentPassword'
              label='Current Password'
              autoComplete='off'
            />
            <PasswordInput
              control={form.control}
              name='newPassword'
              label='New Password'
              autoComplete='off'
            />
            <PasswordInput
              control={form.control}
              name='confirmNewPassword'
              label='Confirm New Password'
              autoComplete='off'
            />
          </div>
          <Button
            type='submit'
            variant='primary'
            className='w-full'
            disabled={!form.formState.isValid}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileSecurityForm;
