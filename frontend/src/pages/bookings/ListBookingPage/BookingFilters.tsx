import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Form } from '../../../common/components/ui/common/Form';
import TextInput from '../../../common/components/ui/common/TextInput/TextInput';
import { Dropdown } from 'src/common/components/ui/common/Dropdown/Dropdown';
import { useFetchFacilitiesQuery } from 'src/common/store/reducers/facility/facilityApi';

const formSchema = yup.object({
  facility: yup.string(),
  endDate: yup.date(),
  startDate: yup.date(),
  status: yup.string().oneOf(['pending', 'accepted', 'rejected', 'canceled', 'completed']),
});

type FormValues = yup.InferType<typeof formSchema>;

export const BookingFilters = ({
  handleInputChange,
}: {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const form = useForm<FormValues>({
    resolver: yupResolver<FormValues>(formSchema),
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
                { label: 'Pending', value: 'pending' },
                { label: 'Accepted', value: 'accepted' },
                { label: 'Rejected', value: 'rejected' },
                { label: 'Canceled', value: 'canceled' },
                { label: 'Completed', value: 'completed' },
              ]}
              ddType='default'
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
              ddType='default'
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
