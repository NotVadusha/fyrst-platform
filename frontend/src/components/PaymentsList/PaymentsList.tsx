import React from 'react';
import styles from './PaymentsList.module.css';
import Table, { ColumnInfo } from '../../ui/common/Table/Table';
import { Dropdown } from '../ui/common/Dropdown/Dropdown';
import TextInput from '../ui/common/TextInput/TextInput';
import { FormProvider, useForm } from 'react-hook-form';
import { getPaymentData, workerOptions } from './mockData';

interface PaymentData {
  date: string;
  worker: string;
  amountPaid: number;
  type: string;
  instapayPercentage: number;
  status: string;
}

const PaymentsList = () => {
  const payments = getPaymentData();

  const statusColors = [
    { status: 'Completed', color: 'text-green-2' },
    { status: 'Pending', color: 'text-hover' },
    { status: 'Failed', color: 'text-red-2' },
  ];

  const columns: ColumnInfo<PaymentData>[] = [
    {
      columnName: 'Date',
      renderCell: item => item.date,
    },
    {
      columnName: 'Worker',
      renderCell: item => item.worker,
    },
    {
      columnName: 'Amount Paid',
      renderCell: item => `$${item.amountPaid.toFixed(2)}`,
    },
    {
      columnName: 'Type',
      renderCell: item => item.type,
    },
    {
      columnName: 'Instapay %',
      renderCell: item => `${item.instapayPercentage}%`,
    },
    {
      columnName: 'Status',
      renderCell: item => {
        const foundStatus = statusColors.find(s => s.status === item.status);
        const statusColor = foundStatus ? foundStatus.color : '';

        return <span className={statusColor}>{item.status}</span>;
      },
    },
  ];

  const methods = useForm();

  return (
    <div className={styles.paymentsContainer}>
      <div className={styles.paymentsHeader}>Payments</div>
      <div className={styles.paymentsFilters}>
        <FormProvider {...methods}>
          <form>
            <div className='flex gap-x-4'>
              <div className='flex flex-col w-full'>
                <Dropdown
                  className='w-[171px]'
                  label='Worker'
                  name='worker'
                  control={methods.control}
                  options={workerOptions}
                  ddType='default'
                  placeholder='Select worker'
                />
              </div>
              <div className='flex flex-col w-full'>
                <label className='text-blue' htmlFor='selectDate'>Start date</label>
                <TextInput
                  name='selectDate'
                  control={methods.control}
                  type='date'
                  id='selectDate'
                  label=''
                />
              </div>
              <div className='flex flex-col w-full'>
                <label className='text-blue' htmlFor='endDate'>End date</label>
                <TextInput
                  name='endDate'
                  control={methods.control}
                  type='date'
                  id='endDate'
                  label=''
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
      <div>
        <Table items={payments} columns={columns} getRowId={item => item.date + item.worker} />
      </div>
    </div>
  );
};

export default PaymentsList;
