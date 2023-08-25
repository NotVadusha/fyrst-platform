import React, { useState } from 'react';
import { Header } from 'src/components/ui/layout/Header/Header';
import { Button } from 'src/ui/common/Button';
import Table, { ColumnInfo } from 'src/ui/common/Table/Table';
import { useGetUsersQuery } from '../../store/services/user.service';
import type { User } from 'types';
import { Spinner } from 'src/ui/common/Spinner/Spinner';
import { Pagination } from 'src/ui/common/Pagination/Pagination';
import { buttonVariants } from 'src/ui/common/Button/Button';
import { Dropdown } from 'src/components/ui/common/Dropdown/Dropdown';
import styles from '../../components/ui/common/TextInput/TextInput.module.css';
import { UserFiltersForm } from './UserFiltersForm';
import { useSearchParams } from 'react-router-dom';
import { UserFilters } from 'types/UserFilters';

export function UserListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const filters: UserFilters = {
    fist_name: searchParams.get('name')?.split(' ')[0] ?? null,
    last_name: searchParams.get('name')?.split(' ')[1] ?? null,
    email: searchParams.get('email'),
    phone: searchParams.get('phone'),
    city: searchParams.get('city'),
    emailConfirmed: searchParams.get('emailConfirmed'),
    birthDate: searchParams.get('birthDate'),
  };

  Object.keys(filters).forEach(key => {
    filters[key as keyof UserFilters] === null && delete filters[key as keyof UserFilters];
  });

  const { data, isLoading, isSuccess, isError, error } = useGetUsersQuery({ currentPage, filters });

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

  const totalPages = data ? Math.ceil(data.totalCount / 5) : 0;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchParams(prevParams => {
      if (e.target.value === '') {
        prevParams.delete(e.target.name);
      } else {
        prevParams.set(e.target.name, e.target.value);
      }

      return prevParams;
    });
  }

  return (
    <>
      <Header title='Users' />
      <div className='mx-16'>
        <div className='flex flex-col space-y-6 mt-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-4xl font-bold'>Users</h2>
            <div className='flex items-center gap-2'>
              <label className={buttonVariants({ variant: 'secondary' })} htmlFor='files'>
                Import Users
              </label>
              <input id='files' className='hidden' type='file' name='file' accept='.csv' />
              <Button variant='secondary'>Export Users CSV</Button>
              <Button variant='primary'>Add User</Button>
            </div>
          </div>
          <UserFiltersForm handleInputChange={handleInputChange} />
          <div className='flex flex-col items-center gap-4'>
            <Table
              className='w-full'
              columns={columns}
              items={data?.users ?? []}
              getRowId={item => {
                return item.id;
              }}
            />
            {!!totalPages && (
              <Pagination
                onChange={setCurrentPage}
                value={currentPage}
                siblingsCount={2}
                totalCount={totalPages}
              />
            )}
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
