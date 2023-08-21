import React, { useState } from 'react';
import { Booking } from 'shared/types/booking';
import { BookingCard } from './BookingCard';
import { ReactComponent as ArrowDownIncon } from '../../icons/arrow-down.svg';

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

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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

      <div className='flex float-right'>
        <button onClick={prevPage} className='mr-2'>
          <ArrowDownIncon className='rotate-90'></ArrowDownIncon>
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index + 1)}
            className={`text-base  align-middle h-6 w-6 rounded-lg mr-2
            ${currentPage === index + 1 ? 'bg-blue text-white' : 'text-blue'}`}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={nextPage}>
          <ArrowDownIncon className='-rotate-90'></ArrowDownIncon>
        </button>
      </div>
    </div>
  );
};

export default BookingGrid;
