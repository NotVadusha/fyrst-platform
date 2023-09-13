import React, { useEffect, useState } from 'react';
import { BookingFilters } from './BookingFilters';
import { useGetAllBookingsQuery } from 'src/common/store/api/packages/bookings/bookingApi';
import { Pagination } from 'src/common/components/ui/common/Pagination/Pagination';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { useSearchParams } from 'react-router-dom';
import { BookingFiltersDto } from 'src/common/packages/booking/types/dto/BookingFiltersDto';
import { Booking } from 'src/common/packages/booking/types/models/Booking.model';
import { BookingCard } from './BookingCard';

const LIMIT = 6;

export default function BookingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    setSearchParams('');
  }, []);

  return (
    <>
      <div className='flex justify-between gap-2'>
        <BookingFilters handleInputChange={handleInputChange}></BookingFilters>
      </div>

      {isFetching ? (
        <div className='flex justify-center min-h-[8rem]'>
          <Spinner size='lg' />
        </div>
      ) : data?.bookings.length === 0 ? (
        <p className='text-body-default font-semibold mt-10'>
          No bookings to display here. Most probably, nothing matches your search query
        </p>
      ) : (
        <div className='mt-6'>
          <div className='flex gap-9 mb-8 flex-wrap items-stretch'>
            {data?.bookings?.map(booking => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
          <div className='md:float-right'>
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
    </>
  );
}
