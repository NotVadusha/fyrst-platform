import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Dropdown } from 'src/components/ui/common/Dropdown/Dropdown';
import * as yup from 'yup';
import { Form, FormControl, FormLabel, FormField, FormItem } from '../../components/ui/common/Form';
import TextInput from '../../components/ui/common/TextInput/TextInput';
import { userFiltersSchema } from 'src/lib/validations/user-filters';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/common/Select/Select';

type FormValues = yup.InferType<typeof userFiltersSchema>;

export function UserFiltersForm({
  handleInputChange,
}: {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const form = useForm<FormValues>({
    resolver: yupResolver<FormValues>(userFiltersSchema),
  });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex gap-x-4'>
          <div className='flex flex-col gap-y-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  {/*eslint-disable-next-line */}
                  {/*@ts-ignore*/}
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    {/*eslint-disable-next-line */}
                    {/*@ts-ignore*/}
                    <TextInput
                      control={form.control}
                      type='text'
                      label='Name'
                      {...field}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col gap-y-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  {/*eslint-disable-next-line */}
                  {/*@ts-ignore*/}
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    {/*eslint-disable-next-line */}
                    {/*@ts-ignore*/}
                    <TextInput
                      control={form.control}
                      type='text'
                      label='Email'
                      {...field}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col gap-y-2'>
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem>
                  {/*eslint-disable-next-line */}
                  {/*@ts-ignore*/}
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    {/*eslint-disable-next-line */}
                    {/*@ts-ignore*/}
                    <TextInput
                      control={form.control}
                      type='text'
                      label='City'
                      {...field}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col gap-y-2'>
            <FormField
              control={form.control}
              name='emailConfirmed'
              render={({ field }) => (
                <FormItem>
                  {/*eslint-disable-next-line */}
                  {/*@ts-ignore*/}
                  <FormLabel>Email Confirmed</FormLabel>
                  <FormControl>
                    {/*@ts-ignore*/}
                    <Select onValueChange={handleInputChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Email confirmed' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={'true'}>true</SelectItem>
                        <SelectItem value={'false'}>false</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col gap-y-2'>
            <FormField
              control={form.control}
              name='birthDate'
              render={({ field }) => (
                <FormItem>
                  {/*eslint-disable-next-line */}
                  {/*@ts-ignore*/}
                  <FormLabel>Birthdate</FormLabel>
                  <FormControl>
                    {/*eslint-disable-next-line */}
                    {/*@ts-ignore*/}
                    <TextInput
                      control={form.control}
                      type='date'
                      required
                      {...field}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
