import React from 'react';
import { Button } from '../../ui/common/Button';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem } from '../ui/common/Form';
import styles from './Notifications.module.css';
import Checkbox from '../ui/common/Checkbox/Checkbox';

const NotificationsForm = () => {
  const config = {
    id: 1,
    user_id: 12345,
    timecards: true,
    bookings: false,
    payment_success: true,
    password_change: false,
    weekly_report: true,
    money_sent: false,
  };

  const form = useForm({
    defaultValues: config,
  });

  async function onSubmit(values: any) {
    console.log(values);
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
          <Button btnType='submit' label='Publish' type='primary' fullWidth>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NotificationsForm;
