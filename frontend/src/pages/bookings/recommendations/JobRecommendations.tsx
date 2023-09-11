import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RefreshButton } from 'src/common/components/ui/common/Button/common/refresh-button/RefreshButton';
import { Pagination } from 'src/common/components/ui/common/Pagination/Pagination';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { Header } from 'src/common/components/ui/layout/Header/Header';
import { calculateTotalPages } from 'src/common/helpers/helpers';

import { useGetBookingRecommendationsQuery } from 'src/common/store/api/packages/bookings/bookingApi';
import { BookingCard } from 'src/pages/bookings/ListBookingPage/BookingCard';

export default function JobRecommendations() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isFetching, refetch } = useGetBookingRecommendationsQuery(currentPage);

  const totalPages = calculateTotalPages({ limit: 6, totalCount: data?.totalCount });

  return (
    <div>
      <div className='h-full'>
        {!!data?.bookings && !isFetching && (
          <div className='flex gap-9 mb-8 flex-wrap items-stretch'>
            {data?.bookings?.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
      {isFetching && (
        <div className='flex items-center justify-center min-h-[500px]'>
          <Spinner size='lg' />{' '}
        </div>
      )}
      <div className='md:float-right '>
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
