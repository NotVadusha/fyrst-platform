import React from 'react';
import { ReactComponent as ClockIcon } from 'src/assets/icons/clock.svg';
import { ReactComponent as CalendrIcon } from 'src/assets/icons/calendar.svg';
import { ReactComponent as ProfileIcon } from 'src/assets/icons/profile.svg';

import { Card } from 'src/common/components/ui/common/Card/Card';
import { Booking } from 'src/common/packages/booking/types/models/Booking.model';
import { Link } from 'react-router-dom';

interface BookingCardProps {
  booking: Booking;
}

type StatusClassMap = {
  pending: string;
  accepted: string;
  rejected: string;
  canceled: string;
  completed: string;
};

export const BookingCard = ({ booking }: BookingCardProps) => {
  const statusClassMap: StatusClassMap = {
    pending: 'bg-[#65ABF6] text-dark-blue',
    accepted: 'bg-[#A7E9F1] text-green',
    rejected: 'bg-[#F8B6B4] text-red-2',
    canceled: 'bg-[#F3F4F6] text-grey',
    completed: 'bg-[#BAF2DC] text-green-2',
  };

  const statusClass = statusClassMap[booking.status as keyof StatusClassMap];
  const createdAt = new Intl.DateTimeFormat('de-DE', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(booking.createdAt));
  const startDate = new Intl.DateTimeFormat('fr-CA').format(new Date(booking.startDate));
  const endDate = new Intl.DateTimeFormat('fr-CA').format(new Date(booking.endDate));
  const fullNames = booking.users.map(user => `${user.first_name} ${user.last_name}`).join(', ');

  return (
    <Link to={`/booking/${booking.id}`}>
      <Card className='px-4 py-4 h-full flex flex-col gap-4'>
        <div className='flex justify-between items-center'>
          <div
            className={`h-7 leading-5 px-2 py-1 rounded-lg font-semibold text-sm  ${statusClass}`}
          >
            {booking.status}
          </div>
          <p className='h-5 leading-5 font-semibold text-sm text-dark-grey'>
            ${booking.pricePerHour}/hr
          </p>
        </div>
        <div className='flex flex-col gap-2'>
          <h5 className='text-2xl leading-6 font-semibold text-black truncate'>
            {booking.facility.name}
          </h5>
          {fullNames.length > 0 && (
            <p className='text-body-small w-64 text-black truncate'>Accepted by {fullNames}</p>
          )}
          <p className='text-sm text-dark-grey'>{booking.positionsAvailable} positions</p>
        </div>
        <div className='flex flex-col gap-4 h-full justify-end'>
          <div className='flex justify-between '>
            <p className='flex items-center text-sm text-dark-grey'>
              <ClockIcon className='mr-1' />
              {createdAt}
            </p>
            <div className='flex items-center  w-32 justify-end'>
              <ProfileIcon></ProfileIcon>
              <p className='text-sm text-dark-grey truncate'>{booking.employersName}</p>
            </div>
          </div>
          <div className='flex justify-between '>
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
        </div>
      </Card>
    </Link>
  );
};
