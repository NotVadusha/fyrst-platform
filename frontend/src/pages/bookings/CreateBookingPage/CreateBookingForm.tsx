import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { Button } from 'src/common/components/ui/common/Button';
import { bookingSchema } from 'src/common/packages/booking/types/validation-schemas/booking.validation-schema';
import { useFetchFacilitiesQuery } from 'src/common/store/api/packages/facility/facilityApi';
import { Form } from 'src/common/components/ui/common/Form/Form';
import TextInput from 'src/common/components/ui/common/Input/common/TextInput/TextInput';
import { Dropdown } from 'src/common/components/ui/common/Dropdown/Dropdown';
import { useSelector } from 'react-redux';
import { RootState } from 'src/common/store';

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
    },
  });
  const onSubmit = (values: CreateBookingFormValues) => {
    const trimmedValues = {
      ...values,
      employersName: values.employersName.trim(),
      notes: values.notes.trim(),
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
          className='z-[99999]'
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
        />
        <TextInput name='pricePerHour' control={form.control} label='Pay per hour' type='number' />
        <TextInput name='startDate' control={form.control} label='' type='date' />
        <TextInput name='endDate' control={form.control} label='' type='date' />
        <TextInput name='notes' control={form.control} label='Job description' type='text' />

        <Button type='submit' variant='primary'>
          Submit
        </Button>
      </form>
    </Form>
  );
}
