import React, { useEffect, useMemo } from 'react';
import { Button } from 'src/common/components/ui/common/Button';
import { useForm } from 'react-hook-form';
import { Form } from '../../common/components/ui/common/Form/Form';
import styles from './NotificationsSettings.module.css';
import Checkbox from 'src/common/components/ui/common/Checkbox/Checkbox';
import { useToast } from 'src/common/components/ui/common/Toast/useToast';
import { useAppSelector } from 'src/common/hooks/redux';
import * as yup from 'yup';
import {
  useGetNotificationsConfigQuery,
  useUpdateNotificationsConfigMutation,
} from 'src/common/store/api/packages/notification-configs/notificationConfigApi';
import { yupResolver } from '@hookform/resolvers/yup';
import { selectUser } from '../../common/store/slices/packages/user/userSelectors';
import { notificationsSchema } from '../../common/packages/notifications/validation-schemas/notifications.validation-schema';

type FormValues = yup.InferType<typeof notificationsSchema>;

const NotificationsForm = () => {
  const user = useAppSelector(selectUser);

  const { data, isLoading } = useGetNotificationsConfigQuery(user.id ?? 1);
  const [updateNotificationsConfig] = useUpdateNotificationsConfigMutation();

  const memoizedData = useMemo(() => data, [data]);

  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: yupResolver<FormValues>(notificationsSchema),
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
          <Button type='submit' className='w-full' disabled={isLoading}>
            Publish
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NotificationsForm;
