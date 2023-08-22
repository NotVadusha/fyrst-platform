import React from 'react';
import styles from './BookingOverview.module.css';

interface BookingDescriptionProps {
  description: string;
}

const BookingDescription: React.FC<BookingDescriptionProps> = ({ description }) => {
  return (
    <div className={`${styles.bookingCard} ${styles.cardDescription}`}>
      <h6 className={styles.bookingCardTitle}>Job desription</h6>
      <p className={styles.bookingCardDescription}>{description}</p>
    </div>
  );
};

export default BookingDescription;
