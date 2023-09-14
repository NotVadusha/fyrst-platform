import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from 'src/common/hooks/redux';
import { useLazyFetchWorkersByFacilityAdminIdQuery } from 'src/common/store/api/packages/timecards/timecardsApi';
import * as yup from 'yup';
import { Form, FormField, FormItem, FormControl } from 'src/common/components/ui/common/Form/Form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/common/components/ui/common/Select/Select';
import { RefreshButton } from 'src/common/components/ui/common/Button/common/refresh-button/RefreshButton';
import TextInput from 'src/common/components/ui/common/Input/common/TextInput/TextInput';
import { userRoles } from 'shared/packages/roles/userRoles';
import { Button } from 'src/common/components/ui/common/Button';
import { ReactComponent as FiltersCloseIcon } from 'src/assets/icons/filters-close.svg';
import { ReactComponent as FiltersOpenIcon } from 'src/assets/icons/filters-open.svg';

type InvoicesFiltersProps = {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (value: string, param: string) => void;
};

const formSchema = yup.object({
  minDate: yup.date(),
  maxDate: yup.date(),
  payee: yup.number(),
});

type FormValues = yup.InferType<typeof formSchema>;

export const InvoicesFilters: React.FC<InvoicesFiltersProps> = ({
  handleInputChange,
  handleSelectChange,
}): React.ReactElement => {
  const user = useAppSelector(state => state.user);
  const userRoleId = useAppSelector(state => state.user.role_id);
  const [getPayees, { data: payees }] = useLazyFetchWorkersByFacilityAdminIdQuery();
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (user.id && user.role_id !== userRoles.WORKER) getPayees(user.id!);
  }, [user]);

  const form = useForm<FormValues>({
    resolver: yupResolver<FormValues>(formSchema),
  });

  const payeeOptions =
    payees?.map(payee => ({
      label: `${payee.employee.first_name} ${payee.employee.last_name}`,
      value: payee.employee.id!,
    })) || [];

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
              {userRoleId !== 1 ? (
                <div className='flex flex-col gap-y-2 w-full md:max-w-[204px]'>
                  <label className='text-body-default text-blue font-medium' htmlFor='payee'>
                    Payee
                  </label>
                  <FormField
                    control={form.control}
                    name='payee'
                    render={({ field }) => (
                      <FormItem>
                        {/*eslint-disable-next-line */}
                        {/*@ts-ignore*/}
                        <FormControl>
                          {/*eslint-disable-next-line */}
                          {/*@ts-ignore*/}
                          <Select onValueChange={value => handleSelectChange(value, 'payee')}>
                            <FormControl>
                              <SelectTrigger>
                                <span className='font-semibold'>
                                  <SelectValue placeholder='All' />
                                </span>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <span className='font-semibold text-dark-blue'>
                                <SelectItem value=''>All</SelectItem>
                              </span>
                              {payeeOptions.map(option => (
                                <span className='font-semibold text-dark-blue' key={option.value}>
                                  <SelectItem value={option.value.toString()}>
                                    {option.label}
                                  </SelectItem>
                                </span>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              ) : null}
              <div className='flex flex-col gap-y-2 w-full md:max-w-[204px]'>
                <label className='text-body-default text-blue font-medium' htmlFor='startDate'>
                  Start date
                </label>
                <FormField
                  control={form.control}
                  name='minDate'
                  render={({ field }) => (
                    <FormItem>
                      {/*eslint-disable-next-line */}
                      {/*@ts-ignore*/}
                      <TextInput
                        control={form.control}
                        type='date'
                        id='startDate'
                        label=''
                        {...field}
                        onChange={handleInputChange}
                      />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex flex-col gap-y-2 w-full md:max-w-[204px]'>
                <label className='text-body-default text-blue font-medium' htmlFor='endDate'>
                  End date
                </label>
                <FormField
                  control={form.control}
                  name='maxDate'
                  render={({ field }) => (
                    <FormItem>
                      {/*eslint-disable-next-line */}
                      {/*@ts-ignore*/}
                      <TextInput
                        control={form.control}
                        type='date'
                        id='endDate'
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
      </div>
    </div>
  );
};
