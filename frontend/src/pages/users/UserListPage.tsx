import Papa from 'papaparse';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { buttonVariants } from 'src/common/components/ui/common/Button/Button';
import { Button } from 'src/common/components/ui/common/Button/index';
import { Pagination } from 'src/common/components/ui/common/Pagination/Pagination';
import Table from 'src/common/components/ui/common/Table/Table';
import { Header } from 'src/common/components/ui/layout/Header/Header';
import { UserFilters } from 'src/common/packages/user/common/user-filters/types/models/UserFilters.model';
import { User } from 'src/common/packages/user/types/models/User.model';
import {
  useAddUsersMutation,
  useGetUsersByParamsQuery,
} from 'src/common/store/api/packages/user/userApi';
import { UserFiltersForm } from './UserFiltersForm';
import { AddUserButton } from './actions/AddUserButton';
import { columns } from './usersTableConfig';
import { hasRole } from 'src/common/helpers/authorization/hasRole';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../common/hooks/redux';
import { exportCSV } from '../../common/store/slices/packages/export-csv/exportCSVSlice';

export function UserListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [addUsers] = useAddUsersMutation();

  const dispatch = useAppDispatch();
  const isCSVLoading = useAppSelector(state => state.exportCSV.isLoading);

  const navigate = useNavigate();
  const user = useAppSelector(state => state.user);

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

  const { data } = useGetUsersByParamsQuery({
    currentPage,
    filters,
  });
  const totalPages = data ? Math.ceil(data.totalCount / 5) : 0;

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement> | string) {
    setSearchParams(prevParams => {
      if (typeof e === 'string') {
        if (e === '' || e === 'any') {
          prevParams.delete('emailConfirmed');
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

    setCurrentPage(1);
  }

  function handleImport(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.[0]) return;

    const csv = Papa.parse(event.target.files[0] as any, {
      header: true,
      complete: result => {
        addUsers(result.data as User[])
          .unwrap()
          .then(() => navigate(0))
          .catch(err => console.log(err));
      },
    });
  }

  const handleExportCSV = () => {
    dispatch(exportCSV({ feature: 'user', filters }));
  };

  return (
    <>
      <Header title='Users' />
      <div className='mx-16 pb-4'>
        <div className='flex flex-col space-y-6 mt-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-4xl font-bold'>Users</h2>
            <div className='flex items-center gap-2'>
              <Button
                variant='secondary'
                onClick={handleExportCSV}
                disabled={data?.totalCount === 0 || isCSVLoading}
              >
                {isCSVLoading ? 'Exporting...' : 'Export CSV'}
              </Button>
              {hasRole('PLATFORM_ADMIN', user as User, false) && (
                <>
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
                  <AddUserButton />
                </>
              )}
            </div>
          </div>
          <UserFiltersForm
            handleInputChange={handleInputChange}
            setSearchParams={setSearchParams}
          />
          <div className='flex flex-col items-center gap-4'>
            {data?.users?.length === 0 ? (
              <p className='text-body-default font-semibold'>
                No users to display here. Most probably, nothing matches your search query
              </p>
            ) : (
              <Table
                className='w-full'
                columns={columns}
                items={data?.users ?? []}
                getRowId={item => {
                  return item.id;
                }}
              />
            )}
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
