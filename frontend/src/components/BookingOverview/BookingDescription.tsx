import React from 'react';
import styles from './BookingOverview.module.css';

interface BookingDescriptionProps {
  description: string;
}

const BookingDescription: React.FC<BookingDescriptionProps> = ({ description }) => {
  const splitDescription = description.split(/\s-\s/);

  return (
    <div className={`${styles.bookingCard} ${styles.cardDescription}`}>
      <h6 className={styles.bookingCardTitle}>Job desription</h6>
      <p className={styles.bookingCardDescription}>{splitDescription[0]}</p>
      <ul className={styles.descriptionList}>
        {splitDescription.slice(1).map((item, index) => (
          <li key={index} className={styles.bookingCardDescription}>
            • {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingDescription;
