import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Form, FormField, FormItem } from '../../../components/ui/common/Form';
import TextInput from '../../../components/ui/common/TextInput/TextInput';
import { TimecardStatus } from 'shared/timecard-status';

const formSchema = yup.object({
  createdAt: yup.date(),
  approvedAt: yup.date(),
  status: yup.string().oneOf(Object.values(TimecardStatus)),
  createdBy: yup.number(),
  approvedBy: yup.number().nullable(),
});

type FormValues = yup.InferType<typeof formSchema>;

export function TimecardFiltersForm({
  handleInputChange,
}: {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const form = useForm<FormValues>({
    resolver: yupResolver<FormValues>(formSchema),
  });

  return (
    <Form {...form}>
      <form>
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
                    label=''
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
                    label=''
                    {...field}
                    onChange={handleInputChange}
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
