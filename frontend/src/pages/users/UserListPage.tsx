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
import { calculateTotalPages } from 'src/common/helpers/helpers';
import { RefreshButton } from '../../common/components/ui/common/Button/common/refresh-button/RefreshButton';
import { ReactComponent as ExportIcon } from 'src/assets/icons/export.svg';
import { ReactComponent as ImportIcon } from 'src/assets/icons/import.svg';

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

  const totalPages = calculateTotalPages({ limit: 5, totalCount: data?.totalCount });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement> | string) {
    setSearchParams(prevParams => {
      if (typeof e === 'string') {
        if (e === '' || e === 'all') {
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
      <Header>
        <div className='flex w-full  items-center justify-between'>
          <h2 className='ml-[-15px] md:ml-[15px] text-2xl font-semibold text-dark-grey'>Users</h2>
          <div className='flex items-center gap-2'>
            <Button
              className='px-[16px] md:px-[32px]'
              variant='secondary'
              onClick={handleExportCSV}
              disabled={data?.totalCount === 0 || isCSVLoading}
            >
              <span className='hidden md:inline'>
                {isCSVLoading ? 'Exporting...' : 'Export CSV'}
              </span>
              <ExportIcon className='md:hidden w-6 h-6' />
            </Button>
            {hasRole('PLATFORM_ADMIN', user as User, false) && (
              <>
                <label
                  className={`${buttonVariants({ variant: 'secondary' })} px-[16px] md:px-[32px]`}
                  htmlFor='files'
                >
                  <span className='hidden md:inline'>Import Users</span>
                  <ImportIcon className='md:hidden w-6 h-6' />
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
      </Header>
      <div className='container lg:max-w-[955px] px-4 sm:px-6 lg:px-8 flex justify-center flex-col mx-auto mt-10 mb-10 space-y-6 xl:max-w-[1150px]'>
        <div className='flex items-center justify-between mb-6'>
          <h5 className='text-2xl leading-6 font-semibold text-dark-grey'>Users</h5>
          <RefreshButton />
        </div>
        <div className='flex justify-between gap-2'>
          <UserFiltersForm
            handleInputChange={handleInputChange}
            setSearchParams={setSearchParams}
          />
        </div>
        <div className='flex flex-col items-center gap-4 overflow-x-auto '>
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
          <div className='self-center md:justify-end md:self-end md:float-right'>
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
