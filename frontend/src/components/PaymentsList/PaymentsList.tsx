import React from 'react';
import styles from './PaymentsList.module.css';
import Table, { ColumnInfo } from '../../ui/common/Table/Table';
import { Dropdown } from '../ui/common/Dropdown/Dropdown';
import TextInput from '../ui/common/TextInput/TextInput';
import { FormProvider, useForm } from 'react-hook-form';
import { getPaymentData } from './mockData';

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
        let statusColor;

        switch (item.status) {
          case 'Completed':
            statusColor = 'text-green-2';
            break;
          case 'Pending':
            statusColor = 'text-hover';
            break;
          case 'Failed':
            statusColor = 'text-red-2';
            break;
          default:
            statusColor = '';
            break;
        }

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
          <Dropdown
            defaultValue=''
            options={['John Brown', 'Mike Dors', 'Linda Moon', 'Serj Potter']}
            label='Worker'
            placeholder='Select worker'
            namespace={''}
          />
          <div>
            <label className='text-blue'>Start date</label>
            <TextInput
              control={methods.control}
              name='selectDate'
              label='Select Date'
              type='date'
            />
          </div>
          <div>
            <label className='text-blue'>End date</label>
            <TextInput control={methods.control} name='endDate' label='End Date' type='date' />
          </div>
        </FormProvider>
      </div>
      <div>
        <Table items={payments} columns={columns} getRowId={item => item.date + item.worker} />
      </div>
    </div>
  );
};

export default PaymentsList;
