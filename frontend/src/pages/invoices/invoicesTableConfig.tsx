import React from 'react';
import { Invoice } from 'src/common/packages/invoices/types/models/Invoice.model';
import { ColumnInfo } from '../../common/components/ui/common/Table/Table';
import { capitalizeFirstLetter } from 'src/common/helpers/capitalizeFirstLetter';
import { InvoiceButton } from './InvoiceButton';

const statusColors = [
  { status: 'Completed', color: 'text-green-2' },
  { status: 'Pending', color: 'text-hover' },
  { status: 'Failed', color: 'text-red-2' },
];

export const invoicesColumns: ColumnInfo<Invoice>[] = [
  {
    columnName: 'Invoice date',
    renderCell: item => new Date(item.createdAt).toLocaleDateString(),
  },
  {
    columnName: 'Start date',
    renderCell: item => new Date(item.timecard.booking.startDate).toLocaleDateString(),
  },
  {
    columnName: 'End date',
    renderCell: item => new Date(item.timecard.booking.endDate).toLocaleDateString(),
  },
  {
    columnName: 'Payee',
    renderCell: item => `${item.timecard.employee.first_name} ${item.timecard.employee.last_name}`,
  },
  {
    columnName: 'Amount paid',
    renderCell: item => `$${item.amountPaid.toFixed(2)}`,
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
    columnName: '',
    renderCell: item => {
      return <InvoiceButton id={item.id} />;
    },
  },
];
