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
import { useAddUserMutation, useUpdateUserMutation } from 'src/store/reducers/user/userApi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { User } from 'types';
import { Loader2 } from 'lucide-react';

type Inputs = y.InferType<typeof userSchema>;

export function EditUserForm({ user }: { user: User }) {
  const [editUser, { error }] = useUpdateUserMutation();
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const searchParams = useSearchParams();

  const form = useForm<Inputs>({
    resolver: yupResolver<Inputs>(userSchema),
    defaultValues: {
      birthdate: user.birthdate ?? undefined,
      city: user.city,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.password,
      phone_number: user.phone_number,
      role_id: user.role_id,
    },
  });

  async function onSubmit(values: Inputs) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    editUser({
      id: user.id,
      user: { ...values, phone_number: values.phone_number ?? undefined },
    })
      .unwrap()
      .then(payload => navigate(0))
      .catch(err => setIsLoading(false));
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
                <TextInput
                  control={form.control}
                  type='text'
                  label='Phone number'
                  {...field}
                  value={field.value ?? undefined}
                />
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
        <Button type='submit' variant='primary' className='w-full'>
          {isLoading && <Loader2 className='w-8 h-8 animate-spin mr-2' />}
          Submit
        </Button>
      </form>
    </Form>
  );
}
