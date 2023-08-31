import React, { FC } from 'react';
import styles from './BookingOverview.module.css';

interface StatusCardProps {
  applicantsCount?: number;
}

const StatusCard: FC<StatusCardProps> = ({ applicantsCount = 0 }) => {
  return (
    <div className={`${styles.bookingCard} ${styles.cardStatus}`}>
      <h6 className={styles.bookingCardTitle}>Status</h6>
      <div className={styles.statusContent}>
        {applicantsCount > 0 ? (
          <div className={styles.statusRepives}>
            This job has already received {applicantsCount} applicant
            {applicantsCount > 1 ? 's' : ''}
          </div>
        ) : (
          <div className={styles.statusRepives}>There are currently no applicants for this job</div>
        )}
      </div>
    </div>
  );
};

export default StatusCard;
