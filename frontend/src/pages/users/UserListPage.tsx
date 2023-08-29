import React, { useEffect, useState } from 'react';
import { Header } from 'src/components/ui/layout/Header/Header';
import { Button } from 'src/ui/common/Button';
import Table, { ColumnInfo } from 'src/ui/common/Table/Table';
import { useAddUsersMutation, useGetUsersQuery } from 'src/store/reducers/user/userApi';
import type { User } from 'types';
import { Pagination } from 'src/ui/common/Pagination/Pagination';
import { buttonVariants } from 'src/ui/common/Button/Button';
import { UserFiltersForm } from './UserFiltersForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserFilters } from 'types/UserFilters';
import { UserActions } from './UserActions';
import Papa from 'papaparse';
import { AddUserButton } from './AddUserButton';

export function UserListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const [addUsers, result] = useAddUsersMutation();

  const navigate = useNavigate();

  useEffect(() => {
    setSearchParams('');
  }, []);

  const filters: UserFilters = {
    first_name: searchParams.get('name')?.split(' ')[0] ?? null,
    last_name: searchParams.get('name')?.split(' ')[1] ?? null,
    email: searchParams.get('email'),
    phone: searchParams.get('phone'),
    city: searchParams.get('city'),
    is_confirmed: searchParams.get('emailConfirmed'),
    birthdate: searchParams.get('birthDate'),
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
      renderCell: ({ phone_number }) => phone_number ?? '',
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

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement> | string) {
    console.log(e);
    setSearchParams(prevParams => {
      if (typeof e === 'string') {
        if (e === '') {
          prevParams.delete(e);
        } else {
          prevParams.set('emailConfirmed', e);
        }
      } else {
        if (e.target.value === '') {
          prevParams.delete(e.target.name);
        } else {
          prevParams.set(e.target.name, e.target.value);
        }
      }

      return prevParams;
    });

    setCurrentPage(1)
  }

  function handleExport() {
    if (!data?.users) return;

    const csvData = Papa.unparse(data.users);

    const blob = new Blob([csvData], { type: 'text/csv' });

    const blobURL = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = blobURL;
    downloadLink.download = 'users.csv';

    downloadLink.textContent = 'Download CSV';

    document.body.appendChild(downloadLink);
    downloadLink.click();

    URL.revokeObjectURL(blobURL);
    document.body.removeChild(downloadLink);
  }

  function handleImport(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.[0]) return;

    const csv = Papa.parse(event.target.files[0] as any, {
      header: true,
      complete: result => {
        console.log(result.data);
        addUsers(result.data as User[])
          .unwrap()
          .then(() => navigate(0))
          .catch(err => console.log(err));
      },
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
              <input
                id='files'
                className='hidden'
                type='file'
                name='file'
                accept='.csv'
                onChange={handleImport}
              />
              <Button variant='secondary' onClick={handleExport}>
                Export Users CSV
              </Button>
              <AddUserButton />
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
