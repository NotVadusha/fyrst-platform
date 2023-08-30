import * as React from 'react';

import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem } from '../../../common/components/ui/common/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { timecardSchema } from 'src/common/lib/validation-schemas/timecard';
import { Button } from 'src/common/components/ui/common/Button';
import TextInput from '../../../common/components/ui/common/TextInput/TextInput';
import { User } from 'src/common/types';

export type CreateTimecardFormValues = y.InferType<typeof timecardSchema>;

export function CreateTimeCardForm({
  handleSubmit,
  user,
}: {
  handleSubmit: (values: CreateTimecardFormValues) => void;
  user: User;
}) {
  const form = useForm<CreateTimecardFormValues>({
    resolver: yupResolver(timecardSchema),
    defaultValues: {
      type: 'Weekly',
      employeeName: user.first_name + ' ' + user.last_name,
      managerName: 'Your manager name',
      lunchTaken: '2 hours',
      hoursWorked: 12,
    },
  });

  async function onSubmit(values: CreateTimecardFormValues) {
    handleSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <TextInput
                control={form.control}
                type='text'
                id='text'
                label='Timecard type'
                {...field}
              />
            </FormItem>
          )}
        />

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
                type='text'
                id='hoursWorked'
                label='Hours Worked'
                {...field}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='lunchTaken'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <TextInput
                control={form.control}
                type='text'
                id='lunchTaken'
                label='Lunch Taken'
                {...field}
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
