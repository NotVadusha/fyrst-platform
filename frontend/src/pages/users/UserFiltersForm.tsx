import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { userFiltersSchema } from 'src/common/lib/validations/user-filters';
import * as yup from 'yup';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../common/components/ui/common/Form';
import TextInput from '../../common/components/ui/common/TextInput/TextInput';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/common/components/ui/common/Select/Select';
import { Button } from 'src/common/components/ui/common/Button';
import { RefreshCcw } from 'lucide-react';
import { Navigate, SetURLSearchParams, useNavigate } from 'react-router-dom';
import { RefreshButton } from 'src/common/components/ui/common/RefreshButton';

type FormValues = yup.InferType<typeof userFiltersSchema>;

export function UserFiltersForm({
  handleInputChange,
  setSearchParams,
}: {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSearchParams: SetURLSearchParams;
}) {
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: yupResolver<FormValues>(userFiltersSchema),
  });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <div className='flex gap-2'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex gap-x-4 items-center'>
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
                      {/*eslint-disable-next-line */}
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
                          <SelectItem value={'any'}>any</SelectItem>
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
      <RefreshButton />
    </div>
  );
}
