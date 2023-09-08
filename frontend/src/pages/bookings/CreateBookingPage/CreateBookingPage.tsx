import React from 'react';

import { Card } from 'src/common/components/ui/common/Card/Card';
import { GoBackButton } from 'src/common/components/ui/common/Button/common/go-back-button/GoBackButton';
import { Header } from 'src/common/components/ui/layout/Header/Header';
import { useCreateBookingMutation } from 'src/common/store/api/packages/bookings/bookingApi';
import { CreateBookingForm, CreateBookingFormValues } from './CreateBookingForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'src/common/components/ui/common/Toast/useToast';

export const CreateBookingPage = () => {
  const [createBooking] = useCreateBookingMutation();
  const navigate = useNavigate();

  const handleSubmit = async (values: CreateBookingFormValues) => {
    try {
      await createBooking(values);
      toast({
        variant: 'default',
        title: 'Success',
        description: 'Booking has been created successfully',
      });
      navigate('/booking');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong while creating booking',
      });
    }
  };

  return (
    <>
      <Header title='Create booking' />
      <div className='mx-16'>
        <div className='flex flex-col space-y-6 mt-6'>
          <GoBackButton path='/booking' className='text-dark-grey'>
            All bookings
          </GoBackButton>
          <h2 className='text-4xl font-bold'>Create booking</h2>
          <Card className='max-w-[625px]'>
            <CreateBookingForm handleSubmit={handleSubmit} />
          </Card>
        </div>
      </div>
    </>
  );
};
