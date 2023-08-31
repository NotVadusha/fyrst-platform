import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '../../ui/common/Button';
import { useForm } from 'react-hook-form';
import { Form } from '../ui/common/Form';
import styles from './Notifications.module.css';
import Checkbox from '../ui/common/Checkbox/Checkbox';
import { useToast } from '../ui/common/Toast/useToast';
import * as yup from 'yup';
import { useAppSelector } from 'src/hooks/redux';
import {
  useGetNotificationsConfigQuery,
  useUpdateNotificationsConfigMutation,
} from 'src/store/reducers/notification-configs/notificationConfigApi';
import { yupResolver } from '@hookform/resolvers/yup';
import { NotificationsConfig } from 'types/models/NotificationsConfig';

// interface NotificationConfig {
//   id: number;
//   user_id: number;
//   timecards: boolean;
//   bookings: boolean;
//   payment_success: boolean;
//   password_change: boolean;
//   weekly_report: boolean;
//   money_sent: boolean;
// }
// const initialConfig: NotificationConfig = {
//   id: 1,
//   user_id: 12345,
//   timecards: true,
//   bookings: false,
//   payment_success: true,
//   password_change: false,
//   weekly_report: true,
//   money_sent: false,
// };

const formSchema = yup.object({
  id: yup.number(),
  userId: yup.number(),
  bookings: yup.boolean(),
  timecards: yup.boolean(),
  paymentSuccess: yup.boolean(),
  passwordChange: yup.boolean(),
  weeklyReport: yup.boolean(),
  moneySent: yup.boolean(),
});

type FormValues = yup.InferType<typeof formSchema>;

const NotificationsForm = () => {
  const user = useAppSelector(state => state.user);

  const { data, isLoading } = useGetNotificationsConfigQuery(user.id ?? 1);
  const [updateNotificationsConfig] = useUpdateNotificationsConfigMutation();

  const memoizedData = useMemo(() => data, [data]);

  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: yupResolver<FormValues>(formSchema),
  });

  useEffect(() => {
    if (memoizedData) {
      form.reset({ ...memoizedData });
    }
  }, [memoizedData, form]);

  const onSubmit = (values: FormValues) => {
    const { id, ...rest } = values;

    updateNotificationsConfig({ ...rest });
    toast({
      variant: 'default',
      title: 'Success',
      description: 'Your notification settings have been successfully updated.',
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='p-[32px]'>
          <div className='flex justify-between mb-[16px]'>
            <div className={styles.checkboxContainer}>
              <Checkbox control={form.control} name='timecards' label='Timecards' />
              <Checkbox control={form.control} name='bookings' label='Bookings' />
              <Checkbox control={form.control} name='paymentSuccess' label='Payment Success' />
            </div>

            <div className={styles.checkboxContainer}>
              <Checkbox control={form.control} name='passwordChange' label='Password Change' />
              <Checkbox control={form.control} name='weeklyReport' label='Weekly report' />
              <Checkbox control={form.control} name='moneySent' label='Sent money success' />
            </div>
          </div>
          <Button type='submit' className='w-full' /* disabled={!isChanged} */>
            Publish
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NotificationsForm;
