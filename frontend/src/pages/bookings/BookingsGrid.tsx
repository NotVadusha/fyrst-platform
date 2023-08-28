import React, { useState } from 'react';
import { Booking } from 'types/models/Booking';
import { BookingCard } from './BookingCard';
import { Pagination } from 'src/ui/common/Pagination/Pagination';
import { useGetAllBookingsQuery } from 'src/store/reducers/bookings/bookingApi';
import { idText } from 'typescript';

interface BookingGridProps {
  itemsPerPage: number;
}

const BookingGrid = ({ itemsPerPage }: BookingGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isFetching } = useGetAllBookingsQuery({
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
  });

  console.log(data);

  if (isFetching) {
    console.log('fetching');
  }

  let totalPages = 0;
  if (data) totalPages = Math.ceil(data.total / itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-9 mb-8'>
        {data?.bookings.map((booking: Booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
      <div className=' float-right'>
        <Pagination
          value={currentPage}
          totalCount={totalPages}
          onChange={goToPage}
          siblingsCount={1}
        ></Pagination>
      </div>
    </div>
  );
};

export default BookingGrid;
