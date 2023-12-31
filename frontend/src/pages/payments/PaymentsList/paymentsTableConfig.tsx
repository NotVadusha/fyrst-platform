import React from 'react';
import { Payment } from 'src/common/packages/payments/types/models/Payment.model';
import { ColumnInfo } from '../../../common/components/ui/common/Table/Table';
import { capitalizeFirstLetter } from 'src/common/helpers/capitalizeFirstLetter';
import { Link } from 'react-router-dom';

const statusColors = [
  { status: 'Completed', color: 'text-green-2' },
  { status: 'Pending', color: 'text-hover' },
  { status: 'Failed', color: 'text-red-2' },
];

export function ViewMoreCell({ item }: { item: Payment }) {
  return (
    <Link className='text-blue underline' to={`${item.id}`}>
      View more
    </Link>
  );
}

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
      const formattedStatus = capitalizeFirstLetter(item.status);
      const foundStatus = statusColors.find(s => s.status === formattedStatus);
      const statusColor = foundStatus ? foundStatus.color : '';

      return <span className={statusColor}>{formattedStatus}</span>;
    },
  },
  {
    columnName: 'View more',
    cellComponent: ViewMoreCell,
  },
];
