import React from 'react';
import { Invoice } from 'src/common/packages/invoices/types/models/Invoice.model';
import { ColumnInfo } from '../../common/components/ui/common/Table/Table';

const statusColors = [
  { status: 'Completed', color: 'text-green-2' },
  { status: 'Pending', color: 'text-hover' },
  { status: 'Failed', color: 'text-red-2' },
];

export const invoicesColumns: ColumnInfo<Invoice>[] = [
  {
    columnName: 'Invoice date',
    renderCell: item => item.createdAt.toLocaleDateString(),
  },
  {
    columnName: 'Start date',
    renderCell: item => item.timecard.booking.startDate.toLocaleDateString(),
  },
  {
    columnName: 'End date',
    renderCell: item => item.timecard.booking.endDate.toLocaleDateString(),
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
      const foundStatus = statusColors.find(s => s.status === item.status);
      const statusColor = foundStatus ? foundStatus.color : '';

      return <span className={statusColor}>{item.status}</span>;
    },
  },
];
