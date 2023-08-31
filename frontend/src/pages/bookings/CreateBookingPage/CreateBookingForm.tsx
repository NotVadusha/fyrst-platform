import React from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { Button } from 'src/ui/common/Button';
import { bookingSchema } from 'src/lib/validations/booking';
import { Form, FormField, FormItem } from 'src/components/ui/common/Form';
import TextInput from 'src/components/ui/common/TextInput/TextInput';
import { useFetchFacilitiesQuery } from 'src/store/reducers/facility/facilityApi';
import { Dropdown } from 'src/components/ui/common/Dropdown/Dropdown';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

export type Inputs = y.InferType<typeof bookingSchema>;
export function CreateBookingForm({ handleSubmit }: { handleSubmit: (values: Inputs) => void }) {
  const user = useSelector((state: RootState) => state.user);
  const form = useForm<Inputs>({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      status: 'pending',
      numberOfPositions: 1,
      facilitiesRate: 1,
      createdBy: user.id,
      sex: 'Female',
      age: 18,
      education: 'colleage',
      workingHours: 1,
    },
  });

  async function onSubmit(values: Inputs) {
    handleSubmit(values);
  }
  const { data: facilities } = useFetchFacilitiesQuery({});
  const options = facilities
    ? facilities.map(facility => ({
        label: facility.name,
        value: facility.id,
      }))
    : [];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='employersName'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <TextInput
                control={form.control}
                type='text'
                id='employersName'
                label='Employers name'
                {...field}
              />
            </FormItem>
          )}
        />

        <Dropdown
          className='z-[9999]'
          label=''
          control={form.control}
          options={options}
          ddType='in-form'
          placeholder='Select an option'
          id='facilityId'
          name='facilityId'
        />

        <FormField
          control={form.control}
          name='positionsAvailable'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <TextInput
                control={form.control}
                type='number'
                id='positionsAvailable'
                label='Positions available'
                {...field}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='pricePerHour'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <TextInput
                control={form.control}
                type='number'
                id='payPerHour'
                label='Pay per hour'
                {...field}
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='startDate'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <TextInput control={form.control} type='date' id='startDate' label='' {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='endDate'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <TextInput control={form.control} type='date' id='endDate' label='' {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='notes'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <TextInput control={form.control} type='text' id='notes' label='Notes' {...field} />
            </FormItem>
          )}
        />
        <Button type='submit' variant='primary'>
          Submit
        </Button>
      </form>
    </Form>
  );
}
