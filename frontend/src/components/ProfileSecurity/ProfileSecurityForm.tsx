import React from 'react';
import { Form } from '../ui/common/Form';
import { PasswordInput } from '../ui/common/PasswordInput/PasswordInput';
import { Button } from '../../ui/common/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './ProfileSecurity.module.css';
import { updatePasswordSchema } from '../../lib/validations/updatePassword';
import { useToast } from '../ui/common/Toast/useToast';

const ProfileSecurityForm = () => {
  const form = useForm({
    resolver: yupResolver(updatePasswordSchema),
    mode: 'onTouched',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const { toast } = useToast();

  const onSubmit = (data: any) => {
    try {
      form.reset();
      toast({
        variant: 'default',
        title: 'Success',
        description: 'Your password has been successfully updated.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong while updating your password.',
      });
    }
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
