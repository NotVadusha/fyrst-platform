import * as React from 'react';

import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormMessage } from './ui/common/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { timecardSchema } from '../lib/validations/timecard';
import { Button } from 'src/ui/common/Button';
import TextInput from './ui/common/TextInput/TextInput';
import { baseUrl } from 'src/routes/routes';

import { useSubmit } from 'react-router-dom';

type Inputs = y.InferType<typeof timecardSchema>;

export function CreateTimeCardForm() {
  const submit = useSubmit();

  const form = useForm<Inputs>({
    resolver: yupResolver(timecardSchema),
    defaultValues: {
      type: 'something',
      employeeName: 'Dan',
      facility: 'Driver',
      managerName: 'Nick',
      lunchTaken: '2 hours',
    },
  });

  async function onSubmit(values: Inputs) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    submit(values, {
      method: 'POST',
      // action: `${baseUrl}/timecard`,
    });
  }

  console.log(form.getValues());

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
          name='facility'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <TextInput
                control={form.control}
                type='text'
                id='facility'
                label='Facility'
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
        <Button btnType='submit' eventName='submit' label='Publish' type='primary' fullWidth={true}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
