import React, { ReactNode } from 'react';
import { TableHeading } from './TableHeading';
import { TableBody } from './TableBody';
import { Key } from 'react';
import { cn } from 'src/common/helpers/helpers';

export interface ColumnInfo<T> {
  columnName: string;
  width?: string;

  renderCell?: (item: T) => ReactNode;
  renderHeading?: () => ReactNode;

  cellComponent?: React.FC<{ item: T }>;
  headingComponent?: React.FC;
}

interface TableProps<T> extends React.HTMLAttributes<HTMLTableElement> {
  items: T[];
  columns: ColumnInfo<T>[];
  getRowId: (item: T) => Key;
}

export default function Table<T>({ items, columns, getRowId, className, ...props }: TableProps<T>) {
  return (
    <div className='w-full bg-white overflow-visible whitespace-nowrap shadow-xl rounded-lg p-10'>
      <table className={cn('w-full overflow-x-auto whitespace-nowrap', className)} {...props}>
        <TableHeading<T> columns={columns} />
        <TableBody<T> items={items} columns={columns} getRowId={getRowId} />
      </table>
    </div>
  );
}
