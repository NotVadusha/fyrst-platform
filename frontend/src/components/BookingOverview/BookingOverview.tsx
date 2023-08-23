import React from 'react';
import styles from './BookingOverview.module.css';
import BookingNavigation from './BookingNavigation';
import BookingHeader from './BookingHeader';
import BookingDescription from './BookingDescription';
import AdditionalDetails from './AddtionalDetails';
import StatusCard from './StatusCard';
import { useParams } from 'react-router-dom';
import { getBookingData } from './mockData';

const BookingOverview = () => {
  const { id } = useParams<{ id: string }>();

  const {
    jobTitle,
    description,
    employer,
    publishedDate,
    startLocation,
    endLocation,
    hourlyRate,
    avatar,
    avatars,
  } = getBookingData(id!);

  return (
    <div className={styles.bookingContainer}>
      <BookingNavigation />
      <BookingHeader jobTitle={jobTitle} />
      <div className={styles.bookingBody}>
        <BookingDescription description={description} />
        <div className={styles.detailsAndStatusContainer}>
          <AdditionalDetails
            data={{
              employer,
              published: publishedDate,
              startLocation,
              endLocation,
              payment: hourlyRate,
              avatar: avatar,
            }}
          />
          <StatusCard avatars={avatars} applicantsCount={hourlyRate} />
        </div>
      </div>
    </div>
  );
};

export default BookingOverview;
