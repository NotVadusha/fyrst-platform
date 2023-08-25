import React from 'react';
import { Header } from '../ui/layout/Header/Header';
import { useForm } from 'react-hook-form';
import { Form } from '../ui/common/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { Button } from 'src/ui/common/Button';
import TextInput from '../ui/common/TextInput/TextInput';
import styles from './ProfileSecurity.module.css';
import { PasswordInput } from '../ui/common/PasswordInput/PasswordInput';
import ProfileSecurityHeader from './ProfileSecurityHeader';

const passwordUpdateSchema = y.object().shape({
  currentPassword: y.string().required('Current password is required'),
  newPassword: y
    .string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: y
    .string()
    .required('Confirm your new password')
    .oneOf([y.ref('newPassword')], 'Passwords must match'),
});

type Inputs = y.InferType<typeof passwordUpdateSchema>;

const ProfileSecurity = () => {
  const form = useForm<Inputs>({
    resolver: yupResolver(passwordUpdateSchema),
    mode: 'all',
  });
  const { formState } = form;

  const isFormValid = formState.isValid;

  function onSubmit(values: Inputs) {
    console.log(values);
  }

  return (
    <>
      <Header title='Profile' />
      <div className={styles.profileSecurityContainer}>
        <ProfileSecurityHeader />
        <div className={styles.profileSecuriyCard}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className={styles.passwordInputs}></div>

              <Button>Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ProfileSecurity;
