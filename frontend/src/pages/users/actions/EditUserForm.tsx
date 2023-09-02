import * as React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Loader2 } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import { Button } from 'src/common/components/ui/common/Button';
import Checkbox from 'src/common/components/ui/common/Checkbox/Checkbox';
import { Dropdown } from 'src/common/components/ui/common/Dropdown/Dropdown';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/common/components/ui/common/Form/Form';
import TextInput from 'src/common/components/ui/common/Input/common/TextInput/TextInput';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import { User } from 'src/common/packages/user/types/models/User.model';
import { userSchema } from 'src/common/packages/user/types/validation-schemas/user.validation-schema';
import { useFetchRolesQuery } from 'src/common/store/api/packages/roles/rolesApi';
import CityInput from 'src/pages/profiles/profileEditForm/CityInput';
import * as y from 'yup';
import { roleToText } from './roleToText';

export type EditUserFormInputs = y.InferType<typeof userSchema>;
interface EditUserFormProps {
  user?: User;
  isLoading: boolean;
  onSubmit: (values: EditUserFormInputs) => void;
}

export function EditUserForm({ user, isLoading, onSubmit }: EditUserFormProps) {
  const [_, setCity] = React.useState('');
  const { data: roles, isFetching: isRolesFetching, isError: isRolesError } = useFetchRolesQuery();

  const form = useForm<EditUserFormInputs>({
    resolver: yupResolver<EditUserFormInputs>(userSchema),
    defaultValues: {
      birthdate: user?.birthdate ? String(user.birthdate) : undefined,
      city: user?.city ? user.city : '',
      email: user?.email ? user.email : '',
      is_confirmed: user?.is_confirmed ? user.is_confirmed : false,
      first_name: user?.first_name ? user.first_name : '',
      last_name: user?.last_name ? user.last_name : '',
      phone_number: user?.phone_number ? user.phone_number : '',
      role_id: user?.role_id ? user.role_id : 1,
      permissions: {
        manageBookings: user?.permissions ? user.permissions.manageBookings : false,
        manageTimecards: user?.permissions ? user.permissions.manageTimecards : false,
        manageUsers: user?.permissions ? user.permissions.manageUsers : false,
      },
    },
  });

  const roleId = useWatch({ name: 'role_id', control: form.control });

  if (isRolesError) {
    toast({ variant: 'destructive', title: 'Error', description: "Can't fetch necessary data" });
  }

  if (isRolesFetching || !roles) {
    return (
      <div className='min-h-full flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  const options = roles.map(role => ({
    label: roleToText(role.label),
    value: role.id,
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='first_name'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>First name</FormLabel>
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
                <FormLabel>Last name</FormLabel>
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
                  <TextInput control={form.control} type='date' label='' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='city'
            render={({ field }) => {
              return (
                <FormItem className='flex flex-col'>
                  <FormLabel>City</FormLabel>
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
                <FormLabel>Email</FormLabel>
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
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <TextInput
                  control={form.control}
                  type='tel'
                  id='phone_number'
                  label='Phone'
                  {...field}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='role_id'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Dropdown
                    control={form.control}
                    name='role_id'
                    label='Role'
                    options={options}
                    ddType='in-form'
                    placeholder='Role'
                    className='z-10'
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className='col-span-2'>
            <FormLabel>Email confirmed</FormLabel>
            <Checkbox control={form.control} name='is_confirmed' label='Confirm email?' />
          </div>

          {String(roleId) === '2' && (
            <div className='col-span-2'>
              <FormLabel>Permissions</FormLabel>
              <div className='grid grid-cols-2 gap-4'>
                <Checkbox
                  control={form.control}
                  name='permissions.manageTimecards'
                  label='Manage bookings'
                />
                <Checkbox
                  control={form.control}
                  name='permissions.manageBookings'
                  label='Manage timecards'
                />
                <Checkbox
                  control={form.control}
                  name='permissions.manageUsers'
                  label='Manage users'
                />
              </div>
            </div>
          )}

          <div className='col-span-2'>
            <Button type='submit' variant='primary' className='w-full'>
              {isLoading && <Loader2 className='w-8 h-8 animate-spin mr-2' />}
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
