import React, { FC } from 'react';
import styles from './BookingOverview.module.css';

interface StatusCardProps {
  applicantsCount?: number;
  avatars?: string[];
}

const StatusCard: FC<StatusCardProps> = ({ applicantsCount = 0, avatars = [] }) => {
  return (
    <div className={`${styles.bookingCard} ${styles.cardStatus}`}>
      <h6 className={styles.bookingCardTitle}>Status</h6>
      <div className={styles.statusContent}>
        {applicantsCount > 0 ? (
          <>
            <div className={styles.statusRepives}>
              This job has already received {applicantsCount} applicant{applicantsCount > 1 ? 's' : ''}
            </div>
            <div className={styles.icons}>
              {applicantsCount <= 5
                ? avatars.slice(0, applicantsCount).map((avatar, index) => (
                    <img
                      key={index}
                      className={styles.logo}
                      src={avatar}
                      alt={`Applicant Logo ${index + 1}`}
                    />
                  ))
                : avatars.slice(0, 5).map((avatar, index) => (
                    <img
                      key={index}
                      className={styles.logo}
                      src={avatar}
                      alt={`Applicant Logo ${index + 1}`}
                    />
                  ))}
              {applicantsCount > 5 && (
                <div className={styles.moreApplicants}>+{applicantsCount - 5}</div>
              )}
            </div>
          </>
        ) : (
          <div className={styles.statusRepives}>There are currently no applicants for this job</div>
        )}
      </div>
    </div>
  );
};

export default StatusCard;
