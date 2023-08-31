import React from 'react';

import { Card } from 'src/components/ui/common/Card';
import { GoBackButton } from 'src/components/ui/common/GoBackButton';
import { Header } from 'src/components/ui/layout/Header/Header';
import { CreateBookingForm, CreateBookingFormValues } from './CreateBookingForm';
import { useCreateBookingMutation } from 'src/store/reducers/bookings/bookingApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'src/components/ui/common/Toast/useToast';

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
          <Card className='lg:w-[640px] md:max-w-full mx-auto'>
            <CreateBookingForm handleSubmit={handleSubmit} />
          </Card>
        </div>
      </div>
    </>
  );
};
