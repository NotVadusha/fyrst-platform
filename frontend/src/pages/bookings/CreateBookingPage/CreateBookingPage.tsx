import React from 'react';

import { Card } from 'src/components/ui/common/Card';
import { GoBackButton } from 'src/components/ui/common/GoBackButton';
import { Header } from 'src/components/ui/layout/Header/Header';
import { CreateBookingForm } from './CreateBookingForm';

export const CreateBookingPage = () => {
  return (
    <>
      <Header title='Create booking' />
      <div className='mx-16'>
        <div className='flex flex-col space-y-6 mt-6'>
          <GoBackButton path='/booking' className='text-dark-grey'>
            All bookings
          </GoBackButton>
          <h2 className='text-4xl font-bold'>Create booking</h2>
          <Card className='max-w-[640px]'>
            <CreateBookingForm />
          </Card>
        </div>
      </div>
    </>
  );
};
