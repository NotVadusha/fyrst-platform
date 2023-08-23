import React, { FC } from 'react';
import styles from './BookingOverview.module.css';

interface AdditionalDetailsProps {
  [key: string]: any;
  employer: string;
  published: string;
  startLocation: string;
  endLocation: string;
  payment: number;
  avatar?: string;
}

const LABELS: {
  [key: string]: {
    display: string;
  };
} = {
  employer: { display: 'Employer' },
  published: { display: 'Published' },
  startLocation: { display: 'Start Location' },
  endLocation: { display: 'End Location' },
  payment: { display: 'Payment' },
};

const AdditionalDetails: FC<{ data: AdditionalDetailsProps }> = ({ data }) => (
  <div className={`${styles.bookingCard} ${styles.cardDetails}`}>
    <h6 className={styles.bookingCardTitle}>AdditionalDetails</h6>
    <ul className={styles.additionalDeailsContainer}>
      {Object.keys(LABELS).map(key => {
        const label = LABELS[key].display;
        let value = data[key];

        if (key === 'payment' && typeof value === 'number') {
          value = `$${value}/hr`;
        }

        return (
          <li key={key} className={styles.additionalDeailsElement}>
            <div className={styles.additionalDeailsProp}>{label}</div>
            <div className={styles.additionalDeailsData}>
              {key === 'employer' && data.avatar ? (
                <>
                  <img src={data.avatar} alt={value as string} />
                  <span>{value}</span>
                </>
              ) : (
                value
              )}
            </div>
          </li>
        );
      })}
    </ul>
  </div>
);

export default AdditionalDetails;
