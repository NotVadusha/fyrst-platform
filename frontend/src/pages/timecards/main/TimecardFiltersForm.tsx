import React, { useState } from 'react';
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
import { timecardFiltersSchema } from '../../../common/packages/timecard/types/validation-schemas/timecard-filters.validation-schema';
import { ReactComponent as FiltersCloseIcon } from 'src/assets/icons/filters-close.svg';
import { ReactComponent as FiltersOpenIcon } from 'src/assets/icons/filters-open.svg';
import { Button } from '../../../common/components/ui/common/Button';

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
  const [showFilters, setShowFilters] = useState(false);

  const statusOptions = Object.values(TimecardStatus).map(status => ({
    label: status,
    value: status,
  }));

  return (
    <div className='w-full'>
      <Button
        onClick={() => setShowFilters(!showFilters)}
        variant='primary'
        className='md:hidden justify-between shadow-lg w-full mb-5'
      >
        Filters:
        {showFilters ? (
          <FiltersCloseIcon className='w-[20px]' />
        ) : (
          <FiltersOpenIcon className='w-[20px]' />
        )}
      </Button>
      <div className={`${showFilters || 'hidden'} md:block`}>
        <Form {...form}>
          <form>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-6 w-full'>
              <div className='flex flex-col gap-y-2 w-full md:max-w-[204px]'>
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
                        styleVariant='shadows'
                      />
                    </FormItem>
                  )}
                />
              </div>

              <div className='flex flex-col gap-y-2 w-full md:max-w-[204px]'>
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
                        styleVariant='shadows'
                      />
                    </FormItem>
                  )}
                />
              </div>

              <div className='flex flex-col gap-y-2 w-full md:max-w-[204px]'>
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
      </div>
    </div>
  );
}
