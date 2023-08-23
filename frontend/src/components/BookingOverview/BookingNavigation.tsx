import React from 'react';
import BackIcon from '../../icons/arrow-left.svg';
import styles from './BookingOverview.module.css';

const BookingNavigation = () => {
  return (
    <div className={styles.route}>
      <img src={BackIcon} /> <span>All bookings</span>
    </div>
  );
};

export default BookingNavigation;
