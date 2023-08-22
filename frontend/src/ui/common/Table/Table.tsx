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

interface TableProps<T> {
  /**
   * Items to render
   */
  items: T[];
  /**
   * An array of objects describing the layout of each column.
   * Mapping function or custom components can be passed as needed.
   */
  columns: ColumnInfo<T>[];
  /**
   * Callback to get a unique identifier for each row of the table
   */
  getRowId: (item: T) => Key;
}

export default function Table<T>({ items, columns, getRowId }: TableProps<T>) {
  return (
    <div className='overflow-auto shadow-xl rounded-lg p-10'>
      <table className='w-full'>
        <TableHeading<T> columns={columns} />
        <TableBody<T> items={items} columns={columns} getRowId={getRowId} />
      </table>
    </div>
  );
}
