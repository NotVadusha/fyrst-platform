import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'src/components/ui/layout/Header/Header';
import { Button } from 'src/ui/common/Button';
import Table, { ColumnInfo } from 'src/ui/common/Table/Table';
import { TimecardFiltersForm } from './TimecardFiltersForm';
import { Pagination } from 'src/ui/common/Pagination/Pagination';

export enum TimecardStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
  Completed = 'completed',
  Paid = 'paid',
}

interface Timecard {
  id: number;
  createdAt: string;
  createdBy: number;
  approvedAt?: string;
  approvedBy?: string;
  status: TimecardStatus;
}

const columns: ColumnInfo<Timecard>[] = [
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
    renderCell(item) {
      return item.status;
    },
  },
];

const timecardsMock: Timecard[] = [
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

const statusColors = {
  completed: 'text-green-2',
  pending: 'text-hover',
  accepted: 'text-green',
  rejected: 'text-red-2',
};

const TimeCardPage = () => {
  const timecards = timecardsMock;

  return (
    <section className='min-h-full'>
      <Header title='Timecards'>
        <div className='flex flex-1 justify-end'>
          <div className='flex gap-x-4'>
            <Button type='secondary' label='Export CSV' eventName='dummy' />
            <Link to='create'>
              <Button type='primary' label='Create new timecard' eventName='dummy' />
            </Link>
          </div>
        </div>
      </Header>
      <div className='px-20 py-10 flex flex-col gap-y-6'>
        <h5 className='text-h5 text-dark-grey font-semibold'>Timecards</h5>
        <TimecardFiltersForm />
        {timecards.length > 0 ? (
          <Table columns={columns} items={timecardsMock} getRowId={item => item.id} />
        ) : (
          <p className='text-body-default font-semibold'>
            No timecards to display here. Most probably, nothing matches your search query
          </p>
        )}
        <div className='flex justify-end'>
          {timecards.length > 0 && (
            <Pagination
              totalCount={10}
              siblingsCount={2}
              value={1}
              onChange={_ => {
                return;
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default TimeCardPage;
