import React, { useEffect, useState } from 'react';
import BookingGrid from './BookingsGrid';
import { BookingFilters } from './BookingFilters';
import { useGetAllBookingsQuery } from 'src/common/store/api/packages/bookings/bookingApi';
import { Pagination } from 'src/common/components/ui/common/Pagination/Pagination';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { BookingFiltersDto } from 'src/common/packages/booking/types/dto/BookingFiltersDto';
import { Header } from 'src/common/components/ui/layout/Header/Header';
import { Button } from 'src/common/components/ui/common/Button';
import { hasPermissions } from 'src/common/helpers/authorization/hasPermissions';
import { User } from 'src/common/packages/user/types/models/User.model';
import { useAppDispatch, useAppSelector } from '../../../common/hooks/redux';
import { exportCSV } from '../../../common/store/slices/packages/export-csv/exportCSVSlice';
import { ReactComponent as ExportIcon } from 'src/assets/icons/export.svg';
import { RefreshButton } from '../../../common/components/ui/common/Button/common/refresh-button/RefreshButton';
import { ReactComponent as AddIcon } from 'src/assets/icons/add.svg';

const LIMIT = 6;

const BookingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const user = useAppSelector(state => state.user);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const isCSVLoading = useAppSelector(state => state.exportCSV.isLoading);

  const filters: BookingFiltersDto = {
    facilityId: searchParams.get('facility'),
    endDate: searchParams.get('endDate'),
    startDate: searchParams.get('startDate'),
    status: searchParams.get('status'),
    limit: LIMIT,
    offset: (currentPage - 1) * LIMIT,
  };

  Object.keys(filters).forEach(key => {
    filters[key as keyof BookingFiltersDto] === null &&
      delete filters[key as keyof BookingFiltersDto];
  });

  const { data, isFetching } = useGetAllBookingsQuery(filters);

  let totalPages = 0;
  if (data) totalPages = Math.ceil(data.total / LIMIT);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchParams(prevParams => {
      if (e.target.value === '' || parseInt(e.target.value) === 0) {
        console.log('Target', e.target.name);
        prevParams.delete(e.target.name);
      } else {
        prevParams.set(e.target.name, e.target.value);
      }

      setCurrentPage(1);
      return prevParams;
    });
  }

  const handleExportCSV = () => {
    dispatch(exportCSV({ feature: 'booking', filters }));
  };

  useEffect(() => {
    setSearchParams('');
  }, []);

  return (
    <>
      <Header title='Bookings'>
        {user.permissions && hasPermissions(['manageBookings'], user as User) && (
          <div className='flex flex-1 justify-end'>
            <div className='flex gap-x-4 '>
              <Button
                variant='secondary'
                onClick={handleExportCSV}
                disabled={data?.total === 0 || isCSVLoading}
                className='px-[16px] md:px-[32px]'
              >
                <span className='hidden md:inline'>
                  {isCSVLoading ? 'Exporting...' : 'Export CSV'}
                </span>
                <ExportIcon className='md:hidden w-[20px]' />
              </Button>

              <Button
                variant='primary'
                className='text-sm md:text-base px-[16px] md:px-[32px]'
                onClick={() => navigate('/booking/create')}
              >
                <span className='hidden md:inline'>Create booking</span>
                <AddIcon className='md:hidden w-[27px]' />
              </Button>
            </div>
          </div>
        )}
      </Header>
      <div className='container lg:w-[955px] px-4 sm:px-6 lg:px-8 flex justify-center flex-col mx-auto mt-10 mb-10'>
        <div className='flex items-center justify-between mb-6'>
          <h5 className='text-2xl leading-6 font-semibold text-dark-grey'>Bookings</h5>
          <RefreshButton />
        </div>
        <div className='flex justify-between gap-2'>
          <BookingFilters handleInputChange={handleInputChange}></BookingFilters>
        </div>
        {isFetching ? (
          <div className='flex justify-center min-h-[8rem]'>
            <Spinner size='lg' />
          </div>
        ) : data?.bookings.length === 0 ? (
          <p className='text-body-default font-semibold'>
            No bookings to display here. Most probably, nothing matches your search query
          </p>
        ) : (
          <div className='mt-6'>
            <BookingGrid bookings={data?.bookings ? data.bookings : []}></BookingGrid>
            <div className=' md:float-right'>
              <Pagination
                value={currentPage}
                totalCount={totalPages}
                onChange={currentPage => {
                  setCurrentPage(currentPage);

                  const nextOffset = (currentPage - 1) * LIMIT;
                  setSearchParams(prevParams => {
                    prevParams.set('limit', String(LIMIT));
                    prevParams.set('offset', String(nextOffset));
                    return prevParams;
                  });
                }}
                siblingsCount={1}
              ></Pagination>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingPage;
