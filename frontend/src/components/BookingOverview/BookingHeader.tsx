import React from 'react';
import styles from './BookingOverview.module.css';
import { Button } from '../../ui/common/Button';

interface BookingHeaderProps {
  facility: string;
}

const BookingHeader: React.FC<BookingHeaderProps> = ({ facility }) => {
  return (
    <div className={styles.bookingHeader}>
      <div className={styles.jobTitle}>{facility}</div>
      <Button>Apply</Button>
    </div>
  );
};

export default BookingHeader;
