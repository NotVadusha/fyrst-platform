import React, { useEffect, useState } from 'react';
import BookingGrid from './BookingsGrid';
import { BookingFilters } from './BookingFilters';
import { useGetAllBookingsQuery } from 'src/store/reducers/bookings/bookingApi';
import { Pagination } from 'src/ui/common/Pagination/Pagination';
import { Spinner } from 'src/ui/common/Spinner/Spinner';
import { Link, useSearchParams } from 'react-router-dom';
import { BookingFiltersDto } from 'types/dto/BookingFiltersDto';
import { Header } from 'src/components/ui/layout/Header/Header';
import { Button } from 'src/ui/common/Button';
import { RefreshButton } from 'src/components/ui/common/RefreshButton';

const LIMIT = 6;

const BookingPage = () => {
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
      if (e.target.value === '') {
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
      <Header title='Bookings'>
        <div className='flex flex-1 justify-end'>
          <div className='flex gap-x-4'>
            <Button variant='secondary'>Export CSV</Button>
            <Link to='create'>
              <Button variant='primary'>Create new booking</Button>
            </Link>
          </div>
        </div>
      </Header>
      <div className='container lg:w-[955px] px-4 sm:px-6 lg:px-8 flex justify-center flex-col mx-auto mt-10 '>
        <h5 className='text-2xl leading-6 font-semibold text-dark-grey mb-6'>Bookings</h5>
        <div className='flex justify-between gap-2'>
          <BookingFilters handleInputChange={handleInputChange}></BookingFilters>
          <RefreshButton></RefreshButton>
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
