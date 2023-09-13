import React from 'react';
import { ColumnInfo } from '../../../../common/components/ui/common/Table/Table';
import { TaxCell } from 'src/common/packages/payments/types/models/TaxCell.model';

export const taxesColumns: ColumnInfo<TaxCell>[] = [
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
    renderCell: item => (
      <span className={item.classnames}>{`$${Math.round(item.amount * 100) / 100}`}</span>
    ),
  },
];
