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

const BookingOverview = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data, isLoading, isError } = useGetBookingByIdQuery(id);

  const {
    avatar,
    avatars,
  } = getBookingData(id!);

    console.log(data);

  const numOfPeopleReceived = data?.users ? data.users.length : 0;

  const createdAt = useFormattedDate({ dateString: data?.createdAt, format: 'dash' });
  const startDate = useFormattedDate({ dateString: data?.startDate, format: 'dot' });
  const endDate = useFormattedDate({ dateString: data?.endDate, format: 'dot' });

  if (isLoading) return <Spinner />;
  if (isError || !data) {
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
            <BookingHeader facility={data.facility.name} bookingId={data.id} users={data.users}/>
            <div className={styles.bookingBody}>
              <BookingDescription description={data.notes} />
              <div className={styles.detailsAndStatusContainer}>
                <AdditionalDetails
                  data={{
                    employer: data.employersName,
                    createdAt,
                    startDate,
                    endDate,
                    payment: data.pricePerHour,
                    avatar: avatar,
                  }}
                />
                <StatusCard avatars={avatars} applicantsCount={numOfPeopleReceived} />
              </div>
            </div>
      </div>
    </>
  );
};

export default BookingOverview;
