import React from 'react';
import { ReactComponent as ClockIcon } from '../../icons/clock.svg';
import { ReactComponent as CalendrIcon } from '../../icons/calendar.svg';
import { ReactComponent as ProfileIcon } from '../../icons/Profile.svg';
import { Booking, BookingStatus } from 'shared/types/booking';
import { Card } from 'src/components/ui/common/Card';

interface BookingCardProps {
  booking: Booking;
}

type StatusClassMap = {
  [key in BookingStatus]: string;
};

export const BookingCard = ({ booking }: BookingCardProps) => {
  const statusClassMap: StatusClassMap = {
    [BookingStatus.Pending]: 'bg-[#65ABF6] text-dark-blue',
    [BookingStatus.Accepted]: 'bg-[#A7E9F1] text-green',
    [BookingStatus.Rejected]: 'bg-[#F8B6B4] text-red-2',
    [BookingStatus.Cancelled]: 'bg-[#F3F4F6] text-grey',
    [BookingStatus.Completed]: 'bg-[#BAF2DC] text-green-2',
  };

  const statusClass = statusClassMap[booking.status];
  const createdAt = new Intl.DateTimeFormat('de-DE', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).format(booking.created_at);
  const startDate = new Intl.DateTimeFormat('fr-CA').format(booking.start_date);
  const endDate = new Intl.DateTimeFormat('fr-CA').format(booking.end_date);

  return (
    <Card>
      <div className='flex justify-between mb-4 items-center'>
        <div className={`h-7 leading-5 px-2 py-1 rounded-lg font-semibold text-sm  ${statusClass}`}>
          {booking.status}
        </div>
        <p className='h-5 leading-5 font-semibold text-sm text-dark-grey'>
          ${booking.price_per_hour}/hr
        </p>
      </div>
      <div className='mb-4'>
        <h5 className='mb-2 text-2xl leading-6 font-semibold text-black'>Healthcare worker</h5>
        <p className='text-sm mb-2 text-black'>Accepted by Wade Warren, Donna Miriam</p>
        <p className='text-sm text-dark-grey'>{booking.number_of_positions} positions</p>
      </div>
      <div className='flex justify-between mb-4'>
        <p className='flex items-center text-sm text-dark-grey'>
          <ClockIcon className='mr-1' />
          {createdAt}
        </p>
        <p className='flex items-center text-sm text-dark-grey'>
          <ProfileIcon className='mr-1' />
          {booking.created_by}
        </p>
      </div>
      <div className='flex justify-between mb-4'>
        <p className='flex items-center text-sm text-dark-grey'>
          <CalendrIcon className='mr-1'></CalendrIcon>
          Start date
        </p>
        <p className='text-sm text-dark-grey'>{startDate}</p>
      </div>
      <div className='flex justify-between'>
        <p className='flex items-center text-sm text-dark-grey'>
          <CalendrIcon className='mr-1'></CalendrIcon>
          End date
        </p>
        <p className='text-sm text-dark-grey'>{endDate}</p>
      </div>
    </Card>
  );
};
