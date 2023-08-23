import React, { useState } from 'react';
import { Booking } from 'shared/types/booking';
import { BookingCard } from './BookingCard';
import { Pagination } from 'src/ui/common/Pagination/Pagination';

interface BookingGridProps {
  bookings: Booking[];
  itemsPerPage: number;
}

const BookingGrid: React.FC<BookingGridProps> = ({ bookings, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentBookings = bookings.slice(startIndex, endIndex);

  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-9 mb-8'>
        {currentBookings.map(booking => (
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
