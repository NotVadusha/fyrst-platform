import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
} from '../../../common/components/ui/common/Form/Form';
import TextInput from '../../../common/components/ui/common/Input/common/TextInput/TextInput';
import { TimecardStatus } from 'shared/timecard-status';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/common/components/ui/common/Select/Select';
import { RefreshButton } from 'src/common/components/ui/common/Button/common/refresh-button/RefreshButton';
import { timecardFiltersSchema } from '../../../common/packages/timecard/types/validation-schemas/timecard-filters.validation-schema';

type FormValues = yup.InferType<typeof timecardFiltersSchema>;

export function TimecardFiltersForm({
  handleInputChange,
  handleSelectChange,
}: {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (value: string, param: string) => void;
}) {
  const form = useForm<FormValues>({
    resolver: yupResolver<FormValues>(timecardFiltersSchema),
  });

  const statusOptions = Object.values(TimecardStatus).map(status => ({
    label: status,
    value: status,
  }));

  return (
    <div className='flex gap-2'>
      <Form {...form}>
        <form>
          <div className='flex gap-x-4'>
            <div className='flex flex-col gap-y-2 min-w-[171px]'>
              <label className='text-body-default text-blue font-medium' htmlFor='createdAt'>
                Created at
              </label>
              <FormField
                control={form.control}
                name='createdAt'
                render={({ field }) => (
                  <FormItem>
                    {/*eslint-disable-next-line */}
                    {/*@ts-ignore*/}
                    <TextInput
                      control={form.control}
                      type='date'
                      id='createdAt'
                      label=''
                      {...field}
                      onChange={handleInputChange}
                    />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex flex-col gap-y-2 min-w-[171px]'>
              <label className='text-body-default text-blue font-medium' htmlFor='approvedAt'>
                Approved at
              </label>
              <FormField
                control={form.control}
                name='approvedAt'
                render={({ field }) => (
                  <FormItem>
                    {/*eslint-disable-next-line */}
                    {/*@ts-ignore*/}
                    <TextInput
                      control={form.control}
                      type='date'
                      id='approvedAt'
                      label=''
                      {...field}
                      onChange={handleInputChange}
                    />
                  </FormItem>
                )}
              />
            </div>

            <div className='flex flex-col gap-y-2 min-w-[171px]'>
              <label className='text-body-default text-blue font-medium' htmlFor='approvedAt'>
                Status
              </label>
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={value => handleSelectChange(value, 'status')}>
                        <FormControl>
                          <SelectTrigger>
                            <span className='font-semibold'>
                              <SelectValue placeholder='all' />
                            </span>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <span className='font-semibold text-dark-blue'>
                            <SelectItem value=''>all</SelectItem>
                          </span>
                          {Object.values(TimecardStatus).map(status => (
                            <span className='font-semibold text-dark-blue' key={status}>
                              <SelectItem value={status}>{status}</SelectItem>
                            </span>
                          ))}
                        </SelectContent>
                      </Select>
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
