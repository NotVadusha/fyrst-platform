import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from 'src/common/components/ui/layout/Header/Header';
import { Button } from 'src/common/components/ui/common/Button';
import { Pagination } from 'src/common/components/ui/common/Pagination/Pagination';
import Table from 'src/common/components/ui/common/Table/Table';
import { TimecardFiltersForm } from './TimecardFiltersForm';
import { timecardsTableColumns } from './timecardsTableConfig';
import { useFetchTimecardsQuery } from 'src/common/store/api/packages/timecards/timecardsApi';
import { useSearchParams } from 'react-router-dom';
import { TimecardFiltersDto } from 'src/common/packages/timecard/types/dto/TimecardFiltersDto';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { hasPermissions } from 'src/common/helpers/authorization/hasPermissions';
import { User } from 'src/common/packages/user/types/models/User.model';
import { hasRole } from 'src/common/helpers/authorization/hasRole';
import { useAppDispatch, useAppSelector } from '../../../common/hooks/redux';
import { exportCSV } from '../../../common/store/slices/packages/export-csv/exportCSVSlice';
import { RefreshButton } from '../../../common/components/ui/common/Button/common/refresh-button/RefreshButton';
import { ReactComponent as ExportIcon } from 'src/assets/icons/export.svg';
import { ReactComponent as AddIcon } from 'src/assets/icons/add.svg';

const LIMIT = 5;

const TimeCardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const user = useAppSelector(state => state.user);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const isCSVLoading = useAppSelector(state => state.exportCSV.isLoading);

  const filters: TimecardFiltersDto = {
    createdAt: searchParams.get('createdAt'),
    approvedAt: searchParams.get('approvedAt'),
    approvedBy: searchParams.get('approvedBy'),
    status: searchParams.get('status'),
    createdBy: searchParams.get('createdBy'),
    limit: String(LIMIT),
    offset: String((page - 1) * LIMIT),
  };

  if (hasRole('FACILITY_MANAGER', user as User, true)) {
    filters.facilityId = String(user.facility_id);
  }

  Object.keys(filters).forEach(key => {
    filters[key as keyof TimecardFiltersDto] === null &&
      delete filters[key as keyof TimecardFiltersDto];
  });

  const { data, isFetching } = useFetchTimecardsQuery(filters);

  let totalPages = 0;
  if (data) {
    totalPages = Math.ceil(data.total / LIMIT);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchParams(prevParams => {
      if (e.target.value === '') {
        prevParams.delete(e.target.name);
      } else {
        prevParams.set(e.target.name, e.target.value);
      }

      setPage(1);
      return prevParams;
    });
  }

  function handleSelectChange(value: string, param: string) {
    setSearchParams(prevParams => {
      if (value.length === 0) {
        prevParams.delete(param);
      } else {
        prevParams.set(param, value);
      }

      setPage(1);
      return prevParams;
    });
  }

  const handleExportCSV = () => {
    dispatch(exportCSV({ feature: 'timecard', filters }));
  };

  useEffect(() => {
    setSearchParams('');
  }, []);

  return (
    <section className='min-h-full'>
      <Header title='Timecards'>
        <div className='flex flex-1 justify-end'>
          <div className='flex gap-x-4 mr-[-35px]'>
            <Button
              className='px-[16px] md:px-[32px]'
              variant='secondary'
              onClick={handleExportCSV}
              disabled={data?.total === 0 || isCSVLoading}
            >
              <span className='hidden md:inline'>
                {isCSVLoading ? 'Exporting...' : 'Export CSV'}
              </span>
              <ExportIcon className='md:hidden w-4 h-4' />
            </Button>
            {hasPermissions(['manageBookings'], user as User) && (
              <Button
                variant='primary'
                className='text-sm md:text-base px-[16px] md:px-[32px]'
                onClick={() => navigate('/booking/create')}
              >
                <span className='hidden md:inline'>Create booking</span>
                <AddIcon className='md:hidden w-6 h-6' />
              </Button>
            )}
          </div>
        </div>
      </Header>
      <div className='container lg:max-w-[955px] px-4 sm:px-6 lg:px-8 flex justify-center flex-col mx-auto mt-10 mb-10'>
        <div className='flex flex-col space-y-6'>
          <div className='flex items-center justify-between'>
            <h5 className='text-h5 text-dark-grey font-semibold'>Timecards</h5>
            <RefreshButton />
          </div>
          <TimecardFiltersForm
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
          />
          {isFetching ? (
            <div className='flex justify-center min-h-[8rem]'>
              <Spinner size='lg' />
            </div>
          ) : (
            <div className='flex flex-col items-center gap-4 w-full max-w-[100%] mx-auto'>
              {data?.items.length === 0 ? (
                <p className='text-body-default font-semibold'>
                  No timecards to display here. Most probably, nothing matches your search query
                </p>
              ) : (
                <>
                  <Table
                    className='w-full'
                    columns={timecardsTableColumns}
                    items={data ? data.items : []}
                    getRowId={item => item.id}
                  />
                  <div className='md:flex md:self-end'>
                    {totalPages > 1 && (
                      <Pagination
                        totalCount={totalPages}
                        siblingsCount={2}
                        value={page}
                        onChange={currentPage => {
                          setPage(currentPage);
                          const nextOffset = (currentPage - 1) * LIMIT;
                          setSearchParams(prevParams => {
                            prevParams.set('limit', String(LIMIT));
                            prevParams.set('offset', String(nextOffset));
                            return prevParams;
                          });
                        }}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TimeCardPage;
