import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RefreshButton } from 'src/common/components/ui/common/Button/common/refresh-button/RefreshButton';
import { Pagination } from 'src/common/components/ui/common/Pagination/Pagination';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { Header } from 'src/common/components/ui/layout/Header/Header';

import { useGetBookingRecommendationsQuery } from 'src/common/store/api/packages/bookings/bookingApi';
import BookingGrid from 'src/pages/bookings/ListBookingPage/BookingsGrid';

export default function JobRecommendations() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isFetching, refetch } = useGetBookingRecommendationsQuery(currentPage);

  const limit = 6;

  const totalPages = data ? Math.ceil(data.totalCount / limit) : 0;

  return (
    <div>
      {' '}
      <Header title='Job Recommendations' />
      <div className='container mx-auto items-center lg:w-[955px] px-4 pb-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-black text-2xl my-6'>
            Job recommendations based on your{' '}
            <Link className='underline' to='/profile/edit'>
              profile
            </Link>
          </h1>
          <RefreshButton onClick={refetch} className='self-center' />
        </div>
        {!!data?.bookings && !isFetching && <BookingGrid bookings={data.bookings} />}
        {isFetching && (
          <div className='flex items-center justify-center min-h-[500px]'>
            <Spinner size='lg' />{' '}
          </div>
        )}
        <Pagination
          value={currentPage}
          totalCount={totalPages}
          onChange={currentPage => {
            setCurrentPage(currentPage);
          }}
          siblingsCount={1}
        />
      </div>
    </div>
  );
}
