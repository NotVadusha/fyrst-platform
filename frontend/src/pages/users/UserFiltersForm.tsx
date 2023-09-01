import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { userFiltersSchema } from 'src/common/packages/user/common/user-filters/types/validation-schemas/user-filters.validation-schema';
import * as yup from 'yup';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../common/components/ui/common/Form/Form';
import TextInput from '../../common/components/ui/common/Input/common/TextInput/TextInput';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/common/components/ui/common/Select/Select';
import { SetURLSearchParams } from 'react-router-dom';
import { RefreshButton } from 'src/common/components/ui/common/Button/common/refresh-button/RefreshButton';

type FormValues = yup.InferType<typeof userFiltersSchema>;

export function UserFiltersForm({
  handleInputChange,
  setSearchParams,
}: {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSearchParams: SetURLSearchParams;
}) {
  const form = useForm<FormValues>({
    resolver: yupResolver<FormValues>(userFiltersSchema),
  });

  return (
    <div className='flex items-center justify-center gap-2'>
      <Form {...form}>
        <form>
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
                            <SelectValue placeholder='Email confirmed' className='font-semibold' />
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
