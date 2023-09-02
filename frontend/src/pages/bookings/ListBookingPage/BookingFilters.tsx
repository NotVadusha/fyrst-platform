import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Form } from '../../../common/components/ui/common/Form/Form';
import TextInput from '../../../common/components/ui/common/Input/common/TextInput/TextInput';
import { Dropdown } from 'src/common/components/ui/common/Dropdown/Dropdown';
import { useFetchFacilitiesQuery } from 'src/common/store/api/packages/facility/facilityApi';
import { bookingFiltersSchema } from '../../../common/packages/booking/types/validation-schemas/booking-filters.validation-schema';

type FormValues = yup.InferType<typeof bookingFiltersSchema>;

export const BookingFilters = ({
  handleInputChange,
}: {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const form = useForm<FormValues>({
    resolver: yupResolver<FormValues>(bookingFiltersSchema),
  });

  const { data: facilities } = useFetchFacilitiesQuery({});

  const options = facilities
    ? facilities.map(facility => ({
        label: facility.name,
        value: facility.id,
      }))
    : [];

  options.unshift({ label: 'All', value: 0 });
  return (
    <Form {...form}>
      <form className='w-full'>
        <div className='flex gap-x-4'>
          <div className='flex flex-col w-full'>
            <label className='text-body-default text-blue font-medium' htmlFor='startDate'>
              Status
            </label>
            <Dropdown
              name='status'
              control={form.control}
              options={[
                { label: 'All', value: '' },
                { label: 'Pending', value: 'pending' },
                { label: 'Accepted', value: 'accepted' },
                { label: 'Rejected', value: 'rejected' },
                { label: 'Canceled', value: 'canceled' },
                { label: 'Completed', value: 'completed' },
              ]}
              styleVariant='shadows'
              label=''
              placeholder='Select Status'
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col w-full '>
            <label className='text-body-default text-blue font-medium' htmlFor='startDate'>
              Facility
            </label>
            <Dropdown
              name='facility'
              control={form.control}
              options={options}
              styleVariant='shadows'
              label=''
              placeholder='Select an option'
              onChange={handleInputChange}
            />
          </div>
          <div className='flex flex-col  w-full'>
            <label className='text-body-default text-blue font-medium' htmlFor='startDate'>
              Start date
            </label>
            <TextInput
              className='gap-y-0'
              name='startDate'
              control={form.control}
              type='date'
              id='startDate'
              label=''
              onChange={handleInputChange}
            />
          </div>

          <div className='flex flex-col w-full'>
            <label className='text-body-default text-blue font-medium' htmlFor='endDate'>
              End date
            </label>
            <TextInput
              name='endDate'
              control={form.control}
              type='date'
              id='endDate'
              label=''
              onChange={handleInputChange}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};
