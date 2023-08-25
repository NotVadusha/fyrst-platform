import React, { useState } from 'react';
import { Booking } from 'types/models/Booking';
import { BookingCard } from './BookingCard';
import { Pagination } from 'src/ui/common/Pagination/Pagination';
import { useGetAllBookingsQuery } from 'src/services/bookingApi';

interface BookingGridProps {
  itemsPerPage: number;
}

const BookingGrid = ({ itemsPerPage }: BookingGridProps) => {
  const { data = [], isFetching } = useGetAllBookingsQuery({});

  console.log(data);

  if (isFetching) {
    console.log('fetching');
  }

  if (data.error) {
    console.log(data.error);
  }

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentBookings = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-9 mb-8'>
        {currentBookings.map((booking: Booking) => (
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
