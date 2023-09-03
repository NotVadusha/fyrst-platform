import React, { useState } from 'react';
import { Form } from '../../../common/components/ui/common/Form/Form';
import { PasswordInput } from '../../../common/components/ui/common/Input/common/PasswordInput/PasswordInput';
import { Button } from '../../../common/components/ui/common/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './ProfileSecurity.module.css';
import { updatePasswordSchema } from 'src/common/packages/authentication/password/types/validation-schemas/update-password.validation-schema';
import { useToast } from '../../../common/components/ui/common/Toast/useToast';
import { useChangePasswordMutation } from 'src/common/store/api/packages/user/userApi';
import { useAppSelector } from 'src/common/hooks/redux';
import { Link } from 'react-router-dom';
import { selectUserId } from '../../../common/store/slices/packages/user/userSelectors';

const ProfileSecurityForm = () => {
  const [changePassword] = useChangePasswordMutation();
  const id = useAppSelector(selectUserId);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

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

  const onSubmit = async (data: any) => {
    setShowForgotPassword(false);

    if (id === undefined) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'User ID is undefined.',
      });
      return;
    }

    try {
      const payload = {
        id,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      };

      const result = await changePassword(payload);

      if ('error' in result) {
        throw new Error('You entered the wrong password.');
      }

      toast({
        variant: 'default',
        title: 'Success',
        description: 'Your password has been successfully updated.',
      });
      form.reset();
    } catch (error: unknown) {
      setShowForgotPassword(true);
      if (error instanceof Error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message || 'Something went wrong while updating your password.',
        });
      }
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
          {showForgotPassword && (
            <p className='text-sm mt-5'>
              <Link to='/auth/forgot'>Forgot your password? Reset it here.</Link>
            </p>
          )}
        </div>
      </form>
    </Form>
  );
};

export default ProfileSecurityForm;
