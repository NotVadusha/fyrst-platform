import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { Button } from 'src/ui/common/Button';
import { bookingSchema } from 'src/lib/validations/booking';
import { Form } from 'src/components/ui/common/Form';
import TextInput from 'src/components/ui/common/TextInput/TextInput';
import { useFetchFacilitiesQuery } from 'src/store/reducers/facility/facilityApi';
import { Dropdown } from 'src/components/ui/common/Dropdown/Dropdown';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

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

  const { data: facilities } = useFetchFacilitiesQuery({});
  const options = facilities
    ? facilities.map(facility => ({
        label: facility.name,
        value: facility.id,
      }))
    : [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='flex flex-col gap-6'>
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
          ddType='in-form'
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
