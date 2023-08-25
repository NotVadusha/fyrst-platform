import React from 'react';
import BookingGrid from './BookingsGrid';

const BookingPage = () => {
  return (
    <div className='container lg:w-[955px]  flex justify-center flex-col mx-auto'>
      <h5 className='text-2xl leading-6 font-semibold text-dark-grey mb-6'>Bookings</h5>
      <BookingGrid itemsPerPage={6}></BookingGrid>
    </div>
  );
};

export default BookingPage;
