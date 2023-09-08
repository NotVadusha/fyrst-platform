import React, { useEffect, useState } from 'react';
import BookingGrid from './BookingsGrid';
import { BookingFilters } from './BookingFilters';
import { useGetAllBookingsQuery } from 'src/common/store/api/packages/bookings/bookingApi';
import { Pagination } from 'src/common/components/ui/common/Pagination/Pagination';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { Link, useSearchParams } from 'react-router-dom';
import { BookingFiltersDto } from 'src/common/packages/booking/types/dto/BookingFiltersDto';
import { Header } from 'src/common/components/ui/layout/Header/Header';
import { Button } from 'src/common/components/ui/common/Button';
import { hasPermissions } from 'src/common/helpers/authorization/hasPermissions';
import { User } from 'src/common/packages/user/types/models/User.model';
import { useAppDispatch, useAppSelector } from '../../../common/hooks/redux';
import { exportCSV } from '../../../common/store/slices/packages/export-csv/exportCSVSlice';

const LIMIT = 6;

const BookingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const user = useAppSelector(state => state.user);

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
            <div className='flex gap-x-4'>
              <Button
                variant='secondary'
                onClick={handleExportCSV}
                disabled={data?.total === 0 || isCSVLoading}
              >
                {isCSVLoading ? 'Exporting...' : 'Export CSV'}
              </Button>
              <Link to='create'>
                <Button variant='primary'>Create new booking</Button>
              </Link>
            </div>
          </div>
        )}
      </Header>
      <div className='container lg:w-[955px] px-4 sm:px-6 lg:px-8 flex justify-center flex-col mx-auto mt-10 mb-10'>
        <h5 className='text-2xl leading-6 font-semibold text-dark-grey mb-6'>Bookings</h5>
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
            <div className=' float-right'>
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
