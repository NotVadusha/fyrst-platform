import React from 'react';
import { ColumnInfo } from '../../../common/components/ui/common/Table/Table';
import { Tax } from 'src/common/packages/payments/types/models/Tax.model';

export const taxesColumns: ColumnInfo<Tax>[] = [
  {
    columnName: 'Tax type',
    renderCell: item => <span className={item.classnames}>{item.type}</span>,
  },
  {
    columnName: 'Effective tax rate',
    renderCell: item => <span className={item.classnames}>{item.rate}</span>,
  },
  {
    columnName: 'Taxes in $',
    renderCell: item => <span className={item.classnames}>{`$${item.amount.toFixed(2)}`}</span>,
  },
];
