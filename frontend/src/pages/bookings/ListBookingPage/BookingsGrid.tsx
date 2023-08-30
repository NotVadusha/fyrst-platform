import React from 'react';
import { Booking } from 'src/common/packages/booking/types/models/Booking.model';
import { BookingCard } from './BookingCard';

interface BookingGridProps {
  bookings: Booking[];
}

const BookingGrid = ({ bookings }: BookingGridProps) => {
  return (
    <div>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-9 mb-8 '>
        {bookings.map((booking: Booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default BookingGrid;
