import React from 'react';
import { Button } from '../../ui/common/Button';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem } from '../ui/common/Form';
import styles from './Notifications.module.css';

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

  {
    /* TODO: Replace the native checkboxes below with the custom checkbox component once it's created */
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='p-[32px]'>
          <div className='flex justify-between mb-[16px]'>
            <div>
              <FormField
                control={form.control}
                name='timecards'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center mb-[32px]'>
                      <input
                        className={styles.customCheckbox}
                        type='checkbox'
                        checked={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                      <label htmlFor='timecards'>Timecards</label>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='bookings'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center mb-[32px]'>
                      <input
                        className={styles.customCheckbox}
                        type='checkbox'
                        checked={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                      <label htmlFor='bookings'>Bookings</label>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='payment_success'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center mb-[32px]'>
                      <input
                        className={styles.customCheckbox}
                        type='checkbox'
                        checked={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                      <label htmlFor='payment_success'>Payment Success</label>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name='password_change'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center mb-[32px]'>
                      <input
                        className={styles.customCheckbox}
                        type='checkbox'
                        checked={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                      <label htmlFor='password_change'>Password Change</label>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='weekly_report'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center mb-[32px]'>
                      <input
                        className={styles.customCheckbox}
                        type='checkbox'
                        checked={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                      <label htmlFor='weekly_report'>Weekly report</label>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='money_sent'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center mb-[32px]'>
                      <input
                        className={styles.customCheckbox}
                        type='checkbox'
                        checked={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                      <label htmlFor='money_sent'>Sent money success</label>
                    </div>
                  </FormItem>
                )}
              />
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
