import * as React from 'react';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/common/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { userSchema } from 'src/lib/validations/user';
import { Button } from 'src/ui/common/Button';
import TextInput from 'src/components/ui/common/TextInput/TextInput';
import { useAddUserMutation } from 'src/store/services/user.service';
import { useNavigate } from 'react-router-dom';

type Inputs = y.InferType<typeof userSchema>;

export function AddUserForm() {
  const [addUser, result] = useAddUserMutation();
  const navigate = useNavigate();

  const form = useForm<Inputs>({
    resolver: yupResolver<Inputs>(userSchema),
    defaultValues: {
      city: '',
      email: 'dan@gmail.com',
      first_name: 'Dan',
      last_name: 'Abramov',
      password: '',
      phone_number: '1234567899',
    },
  });

  async function onSubmit(values: Inputs) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    addUser(values);
    navigate(0)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='first_name'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormControl>
                <TextInput control={form.control} type='text' label='First name' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='last_name'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormControl>
                <TextInput control={form.control} type='text' label='Last name' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='birthdate'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Birthdate</FormLabel>
              <FormControl>
                <input type='date' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='city'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormControl>
                <TextInput control={form.control} type='text' label='City' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormControl>
                <TextInput control={form.control} type='text' label='Email' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phone_number'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormControl>
                <TextInput control={form.control} type='text' label='Phone number' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormControl>
                <TextInput control={form.control} type='text' label='Password' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='role_id'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormControl>
                <TextInput control={form.control} type='text' label='Role id' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {/* <button type='submit'>Submit</button> */}
        <Button
          onClick={form.handleSubmit(onSubmit)}
          type='submit'
          variant='primary'
          className='w-full'
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
