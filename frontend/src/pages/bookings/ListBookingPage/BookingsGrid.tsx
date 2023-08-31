import React from 'react';
import { Booking } from 'types/models/Booking';
import { BookingCard } from './BookingCard';

interface BookingGridProps {
  bookings: Booking[];
}

const BookingGrid = ({ bookings }: BookingGridProps) => {
  return (
    <div>
      <div className='grid auto-rows-[280px] lg:grid-cols-3 md:grid-cols-2 gap-9 mb-8 '>
        {bookings.map((booking: Booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default BookingGrid;
