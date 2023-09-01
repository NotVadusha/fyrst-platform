import React, { ReactNode } from 'react';
import { TableHeading } from './TableHeading';
import { TableBody } from './TableBody';
import { Key } from 'react';

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

export default function Table<T>({ items, columns, getRowId, ...props }: TableProps<T>) {
  return (
    <div className='overflow-auto shadow-xl rounded-lg p-10'>
      <table className='w-full' {...props}>
        <TableHeading<T> columns={columns} />
        <TableBody<T> items={items} columns={columns} getRowId={getRowId} />
      </table>
    </div>
  );
}