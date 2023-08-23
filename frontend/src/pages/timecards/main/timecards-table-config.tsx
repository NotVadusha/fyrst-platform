import React from 'react';
import { ColumnInfo } from 'src/ui/common/Table/Table';
import { Timecard } from 'types/timecard';
import { TimecardStatus } from 'shared/timecard-status';

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
      return item.createdBy;
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
      return item.approvedBy ?? '---';
    },
  },
  {
    columnName: 'Status',
    cellComponent: StatusCell,
  },
];

export const timecardsMock: Timecard[] = [
  {
    id: 1,
    createdAt: new Date().toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }),
    createdBy: 1,
    approvedAt: undefined,
    approvedBy: undefined,
    status: TimecardStatus.Pending,
  },
  {
    id: 2,
    createdAt: new Date('2023-08-22').toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }),
    createdBy: 2,
    approvedAt: undefined,
    approvedBy: undefined,
    status: TimecardStatus.Pending,
  },
];
