import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Form } from '../../../components/ui/common/Form';
import TextInput from '../../../components/ui/common/TextInput/TextInput';
import { Dropdown } from 'src/components/ui/common/Dropdown/Dropdown';

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

  return (
    <Form {...form}>
      <form>
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
              options={[{ label: 'option', value: 'value' }]}
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
              label='End date'
              onChange={handleInputChange}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};
