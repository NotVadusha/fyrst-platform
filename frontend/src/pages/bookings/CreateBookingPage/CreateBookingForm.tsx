import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { Button } from 'src/common/components/ui/common/Button';
import { bookingSchema } from 'src/common/packages/booking/types/validation-schemas/booking.validation-schema';
import { useFetchFacilitiesQuery } from 'src/common/store/api/packages/facility/facilityApi';
import {
  Form,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
  FormControl,
} from 'src/common/components/ui/common/Form/Form';
import TextInput from 'src/common/components/ui/common/Input/common/TextInput/TextInput';
import { Dropdown } from 'src/common/components/ui/common/Dropdown/Dropdown';
import { useSelector } from 'react-redux';
import { RootState } from 'src/common/store';
import { Textarea } from 'src/common/components/ui/common/Textarea/Textarea';

export type CreateBookingFormValues = y.InferType<typeof bookingSchema>;

export function CreateBookingForm({
  handleSubmit,
}: {
  handleSubmit: (values: CreateBookingFormValues) => void;
}) {
  const user = useSelector((state: RootState) => state.user);

  const form = useForm<CreateBookingFormValues>({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      status: 'pending',
      numberOfPositions: 1,
      facilitiesRate: 1,
      createdBy: user.id,
      sex: 'Male',
      age: 18,
      education: 'School',
      workingHours: 1,
      notes: '',
    },
  });
  const onSubmit = (values: CreateBookingFormValues) => {
    const trimmedValues = {
      ...values,
      employersName: values.employersName.trim(),
      notes: values.notes ? values.notes.trim() : ' ',
    };

    handleSubmit(trimmedValues);
  };

  const { data: facilities } = useFetchFacilitiesQuery({});
  const options = facilities
    ? facilities.map(facility => ({
        label: facility.name,
        value: facility.id,
      }))
    : [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6' noValidate>
        <TextInput
          name='employersName'
          control={form.control}
          label={`Employer's name`}
          type='text'
        />
        <Dropdown
          name='facilityId'
          control={form.control}
          label='Facility'
          options={options}
          styleVariant='borders'
          placeholder='Facility'
        />
        <TextInput
          name='positionsAvailable'
          control={form.control}
          label='Positions available'
          type='number'
          min={1}
        />
        <TextInput
          name='pricePerHour'
          control={form.control}
          label='Pay per hour'
          type='number'
          min={1}
        />
        <TextInput
          name='startDate'
          control={form.control}
          min={new Date().toISOString().split('T')[0]}
          label='Start date'
          type='date'
        />
        <TextInput
          name='endDate'
          control={form.control}
          min={new Date().toISOString().split('T')[0]}
          label='End date'
          type='date'
        />
        <FormField
          control={form.control}
          name='notes'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className={form.formState.errors.notes ? 'border-red' : ' '}
                  {...field}
                  placeholder='Job description'
                />
              </FormControl>
              <FormMessage />
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
