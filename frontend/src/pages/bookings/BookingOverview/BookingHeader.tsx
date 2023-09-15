import React from 'react';
import styles from './BookingOverview.module.css';
import { Button } from '../../../common/components/ui/common/Button';
import { useAddUserToBookingMutation } from 'src/common/store/api/packages/bookings/bookingApi';
import { useToast } from '../../../common/components/ui/common/Toast/useToast';
import { useAppSelector } from 'src/common/hooks/redux';
import { Booking } from 'src/common/packages/booking/types/models/Booking.model';
import { Timecard } from 'src/common/packages/timecard/types/models/Timecard.model';
import { User } from 'src/common/packages/user/types/models/User.model';
import { Link } from 'react-router-dom';
import { selectUserId } from '../../../common/store/slices/packages/user/userSelectors';
import { useCreateBookingEventMutation } from 'src/common/store/api/packages/calendar/calendarApi';
import { InviteButton } from './InviteButton';

interface BookingHeaderProps {
  facility: string;
  booking: Booking;
  users: User[];
  timecard?: Timecard;
}

const BookingHeader: React.FC<BookingHeaderProps> = ({ facility, booking, users, timecard }) => {
  const userId = useAppSelector(selectUserId);
  const { toast } = useToast();

  const [addUserToBooking, { isLoading }] = useAddUserToBookingMutation();

  const [createEvent] = useCreateBookingEventMutation();

  const userExists = users.some((user: { id: number }) => user.id === userId);

  const handleApplyClick = async () => {
    try {
      await addUserToBooking({ bookingId: booking.id, userId });
      await createEvent({ bookingId: booking.id, userId });
      toast({
        variant: 'success',
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
        <span className='font-semibold text-body-default rounded-lg shadow-lg text-center p-5'>
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
        booking.creator.id !== userId && (
          <Button onClick={handleApplyClick} disabled={userExists}>
            {isLoading ? 'Applying...' : 'Apply'}
          </Button>
        )
      )}
      {booking.creator.id === userId && <InviteButton bookingId={booking.id} />}
    </div>
  );
};

export default BookingHeader;
