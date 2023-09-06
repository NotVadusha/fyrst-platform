import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from 'src/common/hooks/redux';
import { useLazyFetchWorkersByFacilityAdminIdQuery } from 'src/common/store/api/packages/timecards/timecardsApi';
import * as yup from 'yup';
import styles from './InvoicesList.module.css';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
} from '../../common/components/ui/common/Form/Form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/common/components/ui/common/Select/Select';
import { RefreshButton } from 'src/common/components/ui/common/Button/common/refresh-button/RefreshButton';
import TextInput from '../../common/components/ui/common/Input/common/TextInput/TextInput';

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
  const userId = useAppSelector(state => state.user.id);
  const userRoleId = useAppSelector(state => state.user.role_id);
  const [getPayees, { data: payees }] = useLazyFetchWorkersByFacilityAdminIdQuery();

  useEffect(() => {
    if (!!userId) getPayees(userId);
  }, [userId]);

  const form = useForm<FormValues>({
    resolver: yupResolver<FormValues>(formSchema),
  });

  const payeeOptions =
    payees?.map(payee => ({
      label: `${payee.employee.first_name} ${payee.employee.last_name}`,
      value: payee.employee.id!,
    })) || [];

  return (
    <div className={styles.invoicesFilters}>
      <Form {...form}>
        <form>
          <div className='flex gap-x-4'>
            {userRoleId !== 1 ? (
              <div className='flex flex-col gap-y-2 w-[250px]'>
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
                                <SelectValue placeholder='no option selected' />
                              </span>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <span className='font-semibold text-dark-blue'>
                              <SelectItem value=''>no option selected</SelectItem>
                            </span>
                            {payeeOptions.map(option => (
                              <span className='font-semibold text-dark-blue' key={status}>
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
            <div className='flex flex-col gap-y-2'>
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
            <div className='flex flex-col gap-y-2'>
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
      <RefreshButton />
    </div>
  );
};