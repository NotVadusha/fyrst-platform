import React from 'react';
import { Link } from 'react-router-dom';
import { ColumnInfo } from '../../../common/components/ui/common/Table/Table';
import { Timecard } from 'src/common/packages/timecard/types/models/Timecard.model';

const statusColors = {
  pending: 'text-hover',
  paid: 'text-green',
  rejected: 'text-red-2',
  approved: 'text-green-2',
};

export function StatusCell({ item }: { item: Timecard }) {
  return (
    <span className={statusColors[item.status]}>
      {item.status.charAt(0).toLocaleUpperCase() + item.status.slice(1)}
    </span>
  );
}

export function ViewMoreCell({ item }: { item: Timecard }) {
  return (
    <Link className='text-blue underline' to={`${item.id}`}>
      View more
    </Link>
  );
}

export const timecardsTableColumns: ColumnInfo<Timecard>[] = [
  {
    columnName: 'Created at',
    renderCell(item) {
      return item.createdAt;
    },
  },
  {
    columnName: 'Created by',
    renderCell(item) {
      return `${item.employee.first_name} ${item.employee.last_name}`;
    },
  },
  {
    columnName: 'Approved at',
    renderCell(item) {
      return item.approvedAt ?? '---';
    },
  },
  {
    columnName: 'Approved by',
    renderCell(item) {
      return item.approvedBy
        ? `${item.facilityManager.first_name} ${item.facilityManager.last_name}`
        : '---';
    },
  },
  {
    columnName: 'Status',
    cellComponent: StatusCell,
  },
  {
    columnName: 'View more',
    cellComponent: ViewMoreCell,
  },
];
