import * as React from 'react';

import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem } from '../../../common/components/ui/common/Form/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { timecardSchema } from 'src/common/packages/timecard/types/validation-schemas/timecard.validation-schema';
import { Button } from 'src/common/components/ui/common/Button';
import TextInput from '../../../common/components/ui/common/Input/common/TextInput/TextInput';
import { User } from 'src/common/packages/user/types/models/User.model';
import { Booking } from 'src/common/packages/booking/types/models/Booking.model';

export type CreateTimecardFormValues = y.InferType<typeof timecardSchema>;

export function CreateTimeCardForm({
  handleSubmit,
  user,
  booking,
}: {
  handleSubmit: (values: CreateTimecardFormValues) => void;
  user: User;
  booking: Booking;
}) {
  const form = useForm<CreateTimecardFormValues>({
    resolver: yupResolver(timecardSchema),
    defaultValues: {
      employeeName: user.first_name + ' ' + user.last_name,
      managerName: booking.creator.first_name + ' ' + booking.creator.last_name,
      lunchHours: 2,
      hoursWorked: 12,
    },
  });

  async function onSubmit(values: CreateTimecardFormValues) {
    handleSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8' noValidate>
        <FormField
          control={form.control}
          name='employeeName'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <TextInput
                control={form.control}
                type='text'
                id='employeeName'
                label="Employee's name"
                disabled
                {...field}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='managerName'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <TextInput
                control={form.control}
                type='text'
                id='managerName'
                label='Facility Manager name'
                disabled
                {...field}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='hoursWorked'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <TextInput
                control={form.control}
                type='number'
                id='hoursWorked'
                label='Hours Worked'
                {...field}
                min={1}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='lunchHours'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <TextInput
                control={form.control}
                type='number'
                id='lunchTaken'
                label='Lunch hours'
                {...field}
                min={1}
              />
            </FormItem>
          )}
        />

        <Button type='submit' variant='primary'>
          Submit
        </Button>
      </form>
    </Form>
  );
}
