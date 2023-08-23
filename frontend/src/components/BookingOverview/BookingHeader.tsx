import React from 'react';
import styles from './BookingOverview.module.css';
import { Button } from '../../ui/common/Button';

interface BookingHeaderProps {
  jobTitle: string;
}

const BookingHeader: React.FC<BookingHeaderProps> = ({ jobTitle }) => {
  return (
    <div className={styles.bookingHeader}>
      <div className={styles.jobTitle}>{jobTitle}</div>
      <Button label='Apply' type='primary' />
    </div>
  );
};

export default BookingHeader;
