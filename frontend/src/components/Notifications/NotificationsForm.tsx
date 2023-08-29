import React, { useEffect, useState } from 'react';
import { Button } from '../../ui/common/Button';
import { useForm } from 'react-hook-form';
import { Form } from '../ui/common/Form';
import styles from './Notifications.module.css';
import Checkbox from '../ui/common/Checkbox/Checkbox';
import { useToast } from '../ui/common/Toast/useToast';

interface NotificationConfig {
  id: number;
  user_id: number;
  timecards: boolean;
  bookings: boolean;
  payment_success: boolean;
  password_change: boolean;
  weekly_report: boolean;
  money_sent: boolean;
}

const NotificationsForm = () => {
  const initialConfig: NotificationConfig = {
    id: 1,
    user_id: 12345,
    timecards: true,
    bookings: false,
    payment_success: true,
    password_change: false,
    weekly_report: true,
    money_sent: false,
  };

  const [config, setConfig] = useState(initialConfig);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: config,
  });

  const { watch } = form;

  const [isChanged, setIsChanged] = useState(false);

  const values = watch();

  useEffect(() => {
    setIsChanged(JSON.stringify(values) !== JSON.stringify(config));
  }, [values, config]);

  const onSubmit = (values: NotificationConfig) => {
  setConfig(values);
  toast({
    variant: 'default',
    title: 'Success',
    description: 'Your notification settings have been successfully updated.',
  });
  }


  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='p-[32px]'>
          <div className='flex justify-between mb-[16px]'>
            <div className={styles.checkboxContainer}>
              <Checkbox control={form.control} name='timecards' label='Timecards' />
              <Checkbox control={form.control} name='bookings' label='Bookings' />
              <Checkbox control={form.control} name='payment_success' label='Payment Success' />
            </div>

            <div className={styles.checkboxContainer}>
              <Checkbox control={form.control} name='password_change' label='Password Change' />
              <Checkbox control={form.control} name='weekly_report' label='Weekly report' />
              <Checkbox control={form.control} name='money_sent' label='Sent money success' />
            </div>
          </div>
          <Button type='submit' className='w-full' disabled={!isChanged}>
            Publish
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NotificationsForm;
