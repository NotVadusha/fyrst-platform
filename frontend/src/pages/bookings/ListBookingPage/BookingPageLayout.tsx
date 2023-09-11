import React, { useEffect, useState } from 'react';
import { useGetAllBookingsQuery } from 'src/common/store/api/packages/bookings/bookingApi';
import { Link, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { BookingFiltersDto } from 'src/common/packages/booking/types/dto/BookingFiltersDto';
import { Header } from 'src/common/components/ui/layout/Header/Header';
import { Button } from 'src/common/components/ui/common/Button';
import { hasPermissions } from 'src/common/helpers/authorization/hasPermissions';
import { User } from 'src/common/packages/user/types/models/User.model';
import { useAppDispatch, useAppSelector } from '../../../common/hooks/redux';
import { exportCSV } from '../../../common/store/slices/packages/export-csv/exportCSVSlice';
import { cn } from 'src/common/helpers/helpers';

const LIMIT = 6;

const BookingPageLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const user = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();
  const isCSVLoading = useAppSelector(state => state.exportCSV.isLoading);

  const location = useLocation();

  const filters: BookingFiltersDto = {
    facilityId: searchParams.get('facility'),
    endDate: searchParams.get('endDate'),
    startDate: searchParams.get('startDate'),
    status: searchParams.get('status'),
    limit: LIMIT,
    offset: Number(searchParams.get('offset')),
  };

  Object.keys(filters).forEach(key => {
    filters[key as keyof BookingFiltersDto] === null &&
      delete filters[key as keyof BookingFiltersDto];
  });

  const handleExportCSV = () => {
    dispatch(exportCSV({ feature: 'booking', filters }));
  };

  useEffect(() => {
    setSearchParams('');
  }, []);

  console.log(location);

  return (
    <>
      <Header title='Bookings'>
        {user.permissions && hasPermissions(['manageBookings'], user as User) && (
          <div className='flex flex-1 justify-end'>
            <div className='flex gap-x-4'>
              <Button variant='secondary' onClick={handleExportCSV} disabled={isCSVLoading}>
                {isCSVLoading ? 'Exporting...' : 'Export CSV'}
              </Button>
              <Link to='create'>
                <Button variant='primary'>Create new booking</Button>
              </Link>
            </div>
          </div>
        )}
      </Header>
      <div className='container max-w-[1080px] px-4 sm:px-6 lg:px-8 flex justify-center flex-col mx-auto mt-10 mb-10'>
        <h5 className='text-2xl leading-6 font-semibold text-dark-grey'>Bookings</h5>
        <div className='flex gap-4 text-dark-grey font-medium my-6'>
          <Link
            to='/booking'
            className={cn({
              'text-blue underline underline-offset-8': location.pathname === '/booking',
            })}
          >
            All bookings
          </Link>
          <Link
            to='/booking/interview'
            className={cn({
              'text-blue underline underline-offset-8': location.pathname === '/booking/interview',
            })}
          >
            Interviews
          </Link>
          <Link
            to='/booking/recommendation'
            className={cn({
              'text-blue underline underline-offset-8':
                location.pathname === '/booking/recommendation',
            })}
          >
            Recommendations
          </Link>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default BookingPageLayout;
