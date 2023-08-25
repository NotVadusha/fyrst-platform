import React, { useState } from 'react';
import { Header } from 'src/components/ui/layout/Header/Header';
import { Button } from 'src/ui/common/Button';
import Table, { ColumnInfo } from 'src/ui/common/Table/Table';
import { useGetUsersQuery } from '../../store/services/user.service';
import type { User } from 'types';
import { Spinner } from 'src/ui/common/Spinner/Spinner';
import { Pagination } from 'src/ui/common/Pagination/Pagination';

export function UserListPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery({ currentPage });

  const columns: ColumnInfo<User>[] = [
    {
      columnName: 'Name',
      renderCell: cell => `${cell.first_name} ${cell.last_name}`,
    },
    {
      columnName: 'Email',
      renderCell: ({ email }) => email,
    },
    {
      columnName: 'Phone',
      renderCell: ({ phone_number }) => phone_number,
    },
    {
      columnName: 'City',
      renderCell: ({ city }) => city,
    },
    {
      columnName: 'Email confirmed',
      renderCell: ({ is_confirmed }) => String(is_confirmed),
    },
    {
      columnName: 'Birthdate',
      renderCell: ({ birthdate }) => birthdate,
    },
    {
      columnName: 'Actions',
      renderCell: cell => <UserActions user={cell} />,
    },
  ];

  return (
    <>
      <Header title='Users' />
      <div className='mx-16'>
        <div className='flex flex-col space-y-6 mt-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-4xl font-bold'>Users</h2>
            <div className='flex items-center gap-2'>
              <input type='file' name='file' accept='.csv' />
              <Button
                type='secondary'
                label='Export Users CSV'
              />
              <Button type='primary' label='Add User' />
            </div>
          </div>
          <div className='flex flex-col items-center gap-4'>
            <Table
              className='w-full'
              columns={columns}
              items={users ?? []}
              getRowId={item => {
                return item.id;
              }}
            />
            <Pagination
              onChange={setCurrentPage}
              value={currentPage}
              siblingsCount={2}
              totalCount={10}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function UserActions({ user }: { user: User }) {
  return (
    <div className='w-full flex items-center'>
      <span>*</span>
    </div>
  );
}
