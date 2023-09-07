import React from 'react';
import { Payment } from 'src/common/packages/payments/types/models/Payment.model';
import { ColumnInfo } from '../../../common/components/ui/common/Table/Table';
import { capitalizeFirstLetter } from 'src/common/helpers/capitalizeFirstLetter';

const statusColors = [
  { status: 'Completed', color: 'text-green-2' },
  { status: 'Pending', color: 'text-hover' },
  { status: 'Failed', color: 'text-red-2' },
];

export const paymentsColumns: ColumnInfo<Payment>[] = [
  {
    columnName: 'Date',
    renderCell: item => new Date(item.createdAt).toLocaleDateString(),
  },
  {
    columnName: 'Worker',
    renderCell: item =>
      `${item.timecard.employee?.first_name} ${item.timecard.employee?.last_name}`,
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
    renderCell: item => `${item.instapay}%`,
  },
  {
    columnName: 'Status',
    renderCell: item => {
      const foundStatus = statusColors.find(s => s.status === capitalizeFirstLetter(item.status));
      const statusColor = foundStatus ? foundStatus.color : '';

      return <span className={statusColor}>{capitalizeFirstLetter(item.status)}</span>;
    },
  },
];
