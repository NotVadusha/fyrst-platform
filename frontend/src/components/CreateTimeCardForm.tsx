import * as React from 'react';

import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormMessage } from './ui/common/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as y from 'yup';

const formSchema = y.object({
  username: y.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: y.string().max(12, { message: 'Password has to be at most 12 characters long' }),
});

export function CreateTimeCardForm() {
  const form = useForm<y.InferType<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  function onSubmit(values: y.InferType<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

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
        <button type='submit'>Submit</button>
      </form>
    </Form>
  );
}
