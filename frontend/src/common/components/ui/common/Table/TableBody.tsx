import React, { ReactNode } from 'react';
import { ColumnInfo } from './Table';
import { Key } from 'react';

export function TableBody<T>({
  items,
  columns,
  getRowId,
}: {
  items: T[];
  columns: ColumnInfo<T>[];
  getRowId: (item: T) => Key;
}) {
  function getRowCells(item: T): ReactNode {
    return columns.map(column => {
      let bodyCellContent: ReactNode;

      if (column.cellComponent) {
        bodyCellContent = <column.cellComponent item={item} />;
      } else if (column.renderCell) {
        bodyCellContent = column.renderCell(item);
      } else {
        throw new Error('Received no mapping function or component to render as table body cell');
      }

      return (
        <td className='p-3 text-left' key={column.columnName}>
          {bodyCellContent}
        </td>
      );
    });
  }

  if (!items.length) {
    return <tr>No results.</tr>;
  }

  const bodyRows = items.map(item => (
    <tr className='' key={getRowId(item)}>
      {getRowCells(item)}
    </tr>
  ));

  return <tbody>{bodyRows}</tbody>;
}
