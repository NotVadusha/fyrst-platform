import * as React from 'react';

import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormMessage } from './ui/common/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import RadioButton from './ui/common/RadioButton/RadioButton';

const formSchema = y
  .object()
  .shape({
    username: y.string().min(2, 'Username hast to be at most 3 characters long').required(),
    password: y.string().min(3, 'Password hast to be at least 3 characters long').required(),
    enum: y.mixed<'1' | '2' | '3'>().oneOf(['1', '2', '3']).required(),
  })
  .required();

export function CreateTimeCardForm() {
  const form = useForm<y.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      enum: '1',
    },
  });

  function onSubmit(values: y.InferType<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  console.log(form.getValues());

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Username</FormLabel>
              <input type='text' {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Password</FormLabel>
              <input placeholder='123s' {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='enum'
          render={({ field }) => {
            return (
              <FormItem className='flex flex-col'>
                <FormLabel>Password</FormLabel>
                <RadioButton
                  size='big'
                  label='1'
                  {...field}
                  // onChange={e => field.onChange(e.target.value !== '1' ? '1' : field.value)}
                />
                <FormMessage />
                <FormLabel>Password</FormLabel>
                <RadioButton
                  size='big'
                  label='2'
                  {...field}
                  // onChange={e => field.onChange(e.target.value !== '2' ? '2' : field.value)}
                />
                <FormMessage />
                <FormLabel>Password</FormLabel>
                <RadioButton
                  size='big'
                  label='3'
                  {...field}
                  // onChange={e => field.onChange(e.target.value !== '3' ? '3' : field.value)}
                />
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <button type='submit'>Submit</button>
      </form>
    </Form>
  );
}
