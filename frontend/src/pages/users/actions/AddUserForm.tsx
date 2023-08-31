import * as React from 'react';

import { Controller, useForm } from 'react-hook-form';
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
import { useAddUserMutation } from 'src/store/reducers/user/userApi';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { toast } from 'src/components/ui/common/Toast/useToast';
import DateInput from 'src/components/profileEditForm/DateInput';
import CityInput from 'src/components/profileEditForm/CityInput';

type Inputs = y.InferType<typeof userSchema>;

export function AddUserForm() {
  const [addUser, { error }] = useAddUserMutation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const [city, setCity] = React.useState('');

  const form = useForm<Inputs>({
    resolver: yupResolver<Inputs>(userSchema),
    defaultValues: {
      city: '',
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      phone_number: '',
      birthdate: undefined,
    },
  });

  async function onSubmit(values: Inputs) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    addUser({
      ...values,
      birthdate: values.birthdate ?? undefined,
      phone_number: values.phone_number ?? undefined,
    })
      .unwrap()
      .then(payload => {
        navigate(0);
        toast({ title: 'Success', description: 'User successfully added' });
      })
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
        <Controller
          name='birthdate'
          control={form.control}
          render={({ field }) => (
            <DateInput control={form.control} label='Date of birth' {...field} />
          )}
        />
        <FormField
          control={form.control}
          name='city'
          render={({ field }) => {
            return (
              <FormItem className='flex flex-col'>
                <FormControl>
                  <CityInput control={form.control} {...field} setCity={setCity} />
                </FormControl>
              </FormItem>
            );
          }}
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
        {/* <button type='submit'>Submit</button> */}
        <Button
          onClick={form.handleSubmit(onSubmit)}
          type='submit'
          variant='primary'
          className='w-full'
        >
          {isLoading && <Loader2 className='w-8 h-8 animate-spin mr-2' />}
          Submit
        </Button>
      </form>
    </Form>
  );
}
