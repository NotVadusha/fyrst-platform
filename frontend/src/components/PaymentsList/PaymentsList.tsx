import React from 'react';
import styles from './PaymentsList.module.css';
import Table, { ColumnInfo } from '../../ui/common/Table/Table';
import { Dropdown } from '../ui/common/Dropdown/Dropdown';

interface PaymentData {
  date: string;
  worker: string;
  amountPaid: number;
  type: string;
  instapayPercentage: number;
  status: string;
}

const PaymentsList = () => {
  const payments: PaymentData[] = [
    {
      date: '2023-08-20',
      worker: 'John Doe',
      amountPaid: 1500,
      type: 'Full-time',
      instapayPercentage: 10,
      status: 'Completed',
    },
    {
      date: '2023-08-20',
      worker: 'John Doe',
      amountPaid: 1500,
      type: 'Full-time',
      instapayPercentage: 10,
      status: 'Completed',
    },
    {
      date: '2023-08-20',
      worker: 'John Doe',
      amountPaid: 1500,
      type: 'Full-time',
      instapayPercentage: 10,
      status: 'Pending',
    },
    {
      date: '2023-08-20',
      worker: 'John Doe',
      amountPaid: 1500,
      type: 'Full-time',
      instapayPercentage: 10,
      status: 'Pending',
    },
    {
      date: '2023-08-20',
      worker: 'John Doe',
      amountPaid: 1500,
      type: 'Full-time',
      instapayPercentage: 10,
      status: 'Rejected',
    },
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
      columnName: 'Instapay%',
      renderCell: item => `${item.instapayPercentage}%`,
    },
    {
      columnName: 'Status',
      renderCell: item => item.status,
    },
  ];

  return (
    <div className={styles.paymentsContainer}>
      <div>Payment</div>
      <Dropdown defaultValue={''} options={[]} label={''} placeholder={''} namespace={''} />
      <div>
        <input />
        <input />
        <input />
      </div>
      <div>
        <Table items={payments} columns={columns} getRowId={item => item.date + item.worker} />
      </div>
    </div>
  );
};

export default PaymentsList;
