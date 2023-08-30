import React from 'react';

import { Card } from 'src/common/components/ui/common/Card/Card';
import { GoBackButton } from 'src/common/components/ui/common/Button/common/go-back-button/GoBackButton';
import { Header } from 'src/common/components/ui/layout/Header/Header';
import { CreateBookingForm, Inputs } from './CreateBookingForm';
import { useCreateBookingMutation } from 'src/common/store/reducers/bookings/bookingApi';
import { useNavigate } from 'react-router-dom';

export const CreateBookingPage = () => {
  const [createBooking] = useCreateBookingMutation();
  const navigate = useNavigate();
  function handleSubmit(values: Inputs) {
    createBooking(values);
    navigate('/booking');
  }
  return (
    <>
      <Header title='Create booking' />
      <div className='mx-16'>
        <div className='flex flex-col space-y-6 mt-6'>
          <GoBackButton path='/booking' className='text-dark-grey'>
            All bookings
          </GoBackButton>
          <h2 className='text-4xl font-bold'>Create booking</h2>
          <Card className='lg:w-[640px] md:max-w-full mx-auto'>
            <CreateBookingForm handleSubmit={handleSubmit} />
          </Card>
        </div>
      </div>
    </>
  );
};
