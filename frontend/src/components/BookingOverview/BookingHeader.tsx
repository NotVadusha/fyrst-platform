import React, { useEffect, useState } from 'react';
import styles from './BookingOverview.module.css';
import { Button } from '../../ui/common/Button';
import { useAddUserToBookingMutation } from '../../store/reducers/bookings/bookingApi';
import { useToast } from '../ui/common/Toast/useToast';
import { useAppSelector } from '../../hooks/redux';
import { User } from '../../../types';


interface BookingHeaderProps {
  facility: string;
  bookingId: number
  users: User[]
}

const BookingHeader: React.FC<BookingHeaderProps> = ({ facility, bookingId, users }) => {

  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const userId = useAppSelector(state => state.user.id)
  const { toast } = useToast();

  const [addUserToBooking, { isLoading }] = useAddUserToBookingMutation();

    useEffect(() => {
    const userExists = users.some((user: { id: number }) => user.id === userId); 
    if (userExists) {
      setButtonDisabled(true);
    }
  }, [users, userId]);

  const handleApplyClick = async () => {
    try {
      await addUserToBooking({ bookingId, userId });

      toast({
        variant: 'default',
        title: 'Success',
        description: 'User has been successfully added to the booking.',
      });
      
      setButtonDisabled(true);
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
      <Button onClick={handleApplyClick} disabled={isLoading || isButtonDisabled}>
       {isLoading ? 'Applying...' : 'Apply'}
      </Button>
    </div>
  );
};

export default BookingHeader;
