import React, { ReactNode } from 'react';
import { ColumnInfo } from './Table';

export function TableHeading<T>({ columns }: { columns: ColumnInfo<T>[] }) {
  const headingCells = columns.map(column => {
    let headingCellContent: ReactNode;

    if (column.headingComponent) {
      headingCellContent = <column.headingComponent />;
    } else if (column.renderHeading) {
      headingCellContent = column.renderHeading();
    } else {
      headingCellContent = column.columnName;
    }

    return (
      <th className={`text-left p-3 ${column.width ? column.width : ''}`} key={column.columnName}>
        {headingCellContent}
      </th>
    );
  });

  return (
    <thead className='bg-blue bg-opacity-5 w-full '>
      <tr className='font-semibold text-blue first:font-extralight'>{headingCells}</tr>
    </thead>
  );
}
