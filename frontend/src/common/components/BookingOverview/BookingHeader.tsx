import React from 'react';
import styles from './BookingOverview.module.css';
import { Button } from '../ui/common/Button';
import { useAddUserToBookingMutation } from 'src/common/store/reducers/bookings/bookingApi';
import { useToast } from '../ui/common/Toast/useToast';
import { useAppSelector } from 'src/common/hooks/redux';
import { Booking } from 'src/common/types/models/Booking';
import { Timecard } from 'src/common/types/models/Timecard';
import { User } from 'src/common/types/models/User';
import { Link } from 'react-router-dom';

interface BookingHeaderProps {
  facility: string;
  booking: Booking;
  users: User[];
  timecard?: Timecard;
}

const BookingHeader: React.FC<BookingHeaderProps> = ({ facility, booking, users, timecard }) => {
  const userId = useAppSelector(state => state.user.id);
  const { toast } = useToast();

  const [addUserToBooking, { isLoading }] = useAddUserToBookingMutation();

  const userExists = users.some((user: { id: number }) => user.id === userId);

  const handleApplyClick = async () => {
    try {
      await addUserToBooking({ bookingId: booking.id, userId });

      toast({
        variant: 'default',
        title: 'Success',
        description: 'User has been successfully added to the booking.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong while adding the user.',
      });
    }
  };

  return (
    <div className={styles.bookingHeader}>
      <div className={styles.jobTitle}>{facility}</div>
      {timecard ? (
        <span className='font-semibold text-body-default shadow-lg text-center p-5'>
          Your timecard status: {timecard.status}
        </span>
      ) : userExists ? (
        <Link to={`/timecard/create/${booking.id}`}>
          <Button>Add timecard</Button>
        </Link>
      ) : booking.status !== 'pending' || booking.numberOfPositions - users.length === 0 ? (
        <span className='font-semibold text-body-default'>
          You can&apos;t apply for this booking
        </span>
      ) : (
        <Button onClick={handleApplyClick} disabled={userExists}>
          {isLoading ? 'Applying...' : 'Apply'}
        </Button>
      )}
    </div>
  );
};

export default BookingHeader;
