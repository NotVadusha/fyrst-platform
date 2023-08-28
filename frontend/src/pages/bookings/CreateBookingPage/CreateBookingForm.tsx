import React from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { Button } from 'src/ui/common/Button';
import { useSubmit } from 'react-router-dom';
import { bookingSchema } from 'src/lib/validations/booking';
import { Form, FormField, FormItem } from 'src/components/ui/common/Form';
import TextInput from 'src/components/ui/common/TextInput/TextInput';

type Inputs = y.InferType<typeof bookingSchema>;
export function CreateBookingForm() {
  const submit = useSubmit();

  const form = useForm<Inputs>({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      employersName: 'Jhon doe',
      facility: 'Healthcare worker',
      positionsAvailable: 9,
      payPerHour: 8,
      startDate: '2023-08-08',
      endDate: '2023-08-08',
      notes: 'Hello world',
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
          name='employersName'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <TextInput
                control={form.control}
                type='text'
                id='employersName'
                label="Employer's name"
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
          name='positionsAvailable'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <TextInput
                control={form.control}
                type='number'
                id='positionsAvailable'
                label='Positions available'
                {...field}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='payPerHour'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <TextInput
                control={form.control}
                type='number'
                id='payPerHour'
                label='Pay per hour'
                {...field}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='startDate'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <TextInput
                control={form.control}
                type='date'
                id='startDate'
                label='Start date'
                {...field}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='endDate'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <TextInput
                control={form.control}
                type='date'
                id='endDate'
                label='End date'
                {...field}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='notes'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <TextInput control={form.control} type='text' id='notes' label='Notes' {...field} />
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
