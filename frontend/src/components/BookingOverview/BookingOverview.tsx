import React from 'react';
import styles from './BookingOverview.module.css';
import BookingHeader from './BookingHeader';
import BookingDescription from './BookingDescription';
import AdditionalDetails from './AddtionalDetails';
import StatusCard from './StatusCard';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookingData } from './mockData';
import { useGetBookingByIdQuery } from '../../store/reducers/bookings/bookingApi';
import { Header } from '../ui/layout/Header/Header';
import { GoBackButton } from '../ui/common/GoBackButton';
import { useToast } from '../ui/common/Toast/useToast';
import { Spinner } from '../../ui/common/Spinner/Spinner';
import { useFormattedDate } from '../../hooks/useFormattedDate';
import { useAppSelector } from 'src/hooks/redux';
import { useFetchTimecardsQuery } from 'src/store/reducers/timecards/timecardsApi';

const BookingOverview = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const user = useAppSelector(state => state.user);

  const { data: booking, isLoading, isError } = useGetBookingByIdQuery(Number(id));

  const { data: timecards } = useFetchTimecardsQuery({ createdBy: String(user.id ?? 0) });

  const numOfPeopleReceived = booking?.users ? booking.users.length : 0;

  const createdAt = useFormattedDate({ dateString: String(booking?.createdAt), format: 'dash' });
  const startDate = useFormattedDate({ dateString: String(booking?.startDate), format: 'dot' });
  const endDate = useFormattedDate({ dateString: String(booking?.endDate), format: 'dot' });

  if (isLoading || !booking || !timecards) return <Spinner />;

  if (isError || !booking) {
    toast({
      variant: 'destructive',
      title: 'Error',
      description: 'An error occurred while fetching booking data.',
    });

    navigate('/booking');
    return null;
  }

  return (
    <>
      <Header title='Bookings overview' />
      <div className={styles.bookingContainer}>
        <GoBackButton path='/booking' className='text-dark-grey'>
          All bookings
        </GoBackButton>
        <BookingHeader
          facility={booking.facility.name}
          booking={booking}
          users={booking.users}
          timecard={timecards?.items[0]}
        />
        <div className={styles.bookingBody}>
          <BookingDescription description={booking.notes} />
          <div className={styles.detailsAndStatusContainer}>
            <AdditionalDetails
              data={{
                employer: booking.employersName,
                createdAt,
                startDate,
                endDate,
                payment: booking.pricePerHour,
              }}
            />
            <StatusCard applicantsCount={numOfPeopleReceived} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingOverview;
