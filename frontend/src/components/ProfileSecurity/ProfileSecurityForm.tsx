import React from 'react';
import { Form } from '../ui/common/Form';
import { PasswordInput } from '../ui/common/PasswordInput/PasswordInput';
import { Button } from '../../ui/common/Button';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './ProfileSecurity.module.css';
import { updatePasswordSchema } from '../../lib/validations/updatePassword';

const ProfileSecurityForm = () => {
  const form = useForm({
    resolver: yupResolver(updatePasswordSchema),
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
