import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Dropdown } from 'src/components/ui/common/Dropdown/Dropdown';
import * as yup from 'yup';
import { Form, FormField, FormItem } from '../../../components/ui/common/Form';
import TextInput from '../../../components/ui/common/TextInput/TextInput';
import { TimecardStatus } from 'shared/timecard-status';

export function TimecardFiltersForm({
  handleInputChange,
}: {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const formSchema = yup.object({
    createdAt: yup.date(),
    approvedAt: yup.date(),
    status: yup.string().oneOf(Object.values(TimecardStatus)),
    createdBy: yup.number(),
    approvedBy: yup.number().nullable(),
  });

  type FormValues = yup.InferType<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: yupResolver<FormValues>(formSchema),
  });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex gap-x-4'>
          <div className='flex flex-col gap-y-2'>
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
                    label='createdAt'
                    {...field}
                    onChange={handleInputChange}
                  />
                </FormItem>
              )}
            />
          </div>

          <div className='flex flex-col gap-y-2'>
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
                    label='approvedAt'
                    {...field}
                    onChange={handleInputChange}
                  />
                </FormItem>
              )}
            />
          </div>

          <div className='flex flex-col gap-y-2'>
            <label className='text-body-default text-blue font-medium' htmlFor='approvedAt'>
              Created by
            </label>
            <FormField
              control={form.control}
              name='createdBy'
              render={({ field }) => (
                <FormItem>
                  <TextInput
                    control={form.control}
                    type='number'
                    id='createdBy'
                    label='createdBy'
                    {...field}
                    onChange={handleInputChange}
                  />
                </FormItem>
              )}
            />
          </div>

          <div className='flex flex-col gap-y-2'>
            <label className='text-body-default text-blue font-medium' htmlFor='approvedAt'>
              Approved by
            </label>
            <FormField
              control={form.control}
              name='approvedBy'
              render={({ field }) => (
                <FormItem>
                  {/*eslint-disable-next-line */}
                  {/*@ts-ignore*/}
                  <TextInput
                    control={form.control}
                    type='number'
                    id='approvedBy'
                    label='approvedBy'
                    {...field}
                    onChange={handleInputChange}
                  />
                </FormItem>
              )}
            />
          </div>

          <div className='flex flex-col gap-y-2'>
            <label className='text-body-default text-blue font-medium' htmlFor='status'>
              Status
            </label>
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <Dropdown
                    defaultValue='paid'
                    label=''
                    namespace='dummy'
                    placeholder='Status'
                    options={Object.values(TimecardStatus)}
                    {...field}
                  />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}