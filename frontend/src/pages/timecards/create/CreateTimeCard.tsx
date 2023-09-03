import * as React from 'react';

import { Card } from 'src/common/components/ui/common/Card/Card';
import { CreateTimeCardForm } from 'src/pages/timecards/create/CreateTimeCardForm';
import { GoBackButton } from 'src/common/components/ui/common/Button/common/go-back-button/GoBackButton';
import { Header } from 'src/common/components/ui/layout/Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateTimecardMutation } from 'src/common/store/api/packages/timecards/timecardsApi';
import { CreateTimecardFormValues } from './CreateTimeCardForm';
import { useAppSelector } from 'src/common/hooks/redux';
import { User } from 'src/common/packages/user/types/interfaces/User.interface';
import { useGetBookingByIdQuery } from 'src/common/store/api/packages/bookings/bookingApi';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import { selectUser } from '../../../common/store/slices/packages/user/userSelectors';

export default function CreateTimeCardPage() {
  const { bookingId } = useParams();

  const { data: booking, isFetching } = useGetBookingByIdQuery(Number(bookingId));

  const [createTimecard] = useCreateTimecardMutation();
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);

  function handleCreteTimecardFormSubmit(values: CreateTimecardFormValues) {
    createTimecard({
      bookingId: Number(bookingId),
      createdBy: Number(user.id),
      lunchHours: values.lunchHours,
      hoursWorked: values.hoursWorked,
    });

    toast({ title: 'Success', description: 'Successfully created timecard' });

    navigate(`/booking/${bookingId}`);
  }

  if (!booking && !isFetching) {
    toast({ variant: 'destructive', title: 'Error', description: 'Booking not found' });
  }

  if (isFetching || !booking) {
    return (
      <div className='min-h-full flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Header title='Create timecard' />
      <div className='mx-16'>
        <div className='flex flex-col space-y-6 py-6'>
          <GoBackButton path={`/booking/${bookingId}`} className='text-dark-grey'>
            Back to booking
          </GoBackButton>
          <h2 className='text-4xl font-bold'>Create timecard</h2>
          <Card className='max-w-[640px]'>
            <CreateTimeCardForm
              handleSubmit={handleCreteTimecardFormSubmit}
              user={user as User}
              booking={booking}
            />
          </Card>
        </div>
      </div>
    </>
  );
}
