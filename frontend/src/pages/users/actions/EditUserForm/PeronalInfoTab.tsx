import React from 'react';
import { useState } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/common/components/ui/common/Form/Form';
import { TabComponentProps } from 'src/common/components/ui/common/MultiTabForm/MultiTabForm';
import TextInput from 'src/common/components/ui/common/Input/common/TextInput/TextInput';
import CityInput from 'src/pages/profiles/profileEditForm/CityInput';
import { EditUserFormValues } from './EditUserForm';

export function PersonalInfoTab({ form }: TabComponentProps<EditUserFormValues>) {
  const [_, setCity] = useState<string>('');

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
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
    </div>
  );
}
