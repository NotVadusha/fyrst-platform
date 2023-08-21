import React from 'react';
import { Button } from 'src/ui/common/Button';
import styles from './BookingOverview.module.css';
import BackIcon from '../../icons/arrow-left.svg';
import Logo from '../../icons/emp-logo.jpg';
// const AdditionalDeails = {
//   employer: 'John Walker',
//   published: '27.07.2021',
//   startLocation: 'Ukrainska st., 29',
//   endLocation: 'Shevchenko st., 29',
//   payment: '$8/hr',
// };

const BookingOverview = () => {
  return (
    <div>
      <div className={styles.header}>Booking overview</div>
      <div className={styles.bookingOverviewContainer}>
        <div className={styles.route}>
          <img src={BackIcon} /> <span>All bookings</span>
        </div>
        <div className={styles.bookingOverwiewHeader}>
          <div className={styles.profession}>Driver</div>
          <Button label='Apply' type='primary' eventName='' />
        </div>
        <div className={styles.bookingOverwiewBody}>
          <div className={`${styles.bookingOverwiewCard} ${styles.firstCard}`}>
            <h6 className={styles.bookingOverwiewCardTitle}>Job description</h6>
            Drivers are responsible for transporting clients or handling deliveries in a timely
            manner, and they may have to work nights and weekends to accomplish their duties. Common
            duties and responsibilities for drivers are to: - Transport clients and/or packages to
            and from destinations - Arrive at destinations on schedule - Fulfill administrative
            needs, like office pickups - Research and plan for traffic, construction and weather
            delays - Use navigation applications to determine the best route - Interact with clients
            professionally at all times - Ensure that the vehicle is always fueled and ready for use
            - Arrange for vehicle repairs as needed - Keep mileage records and repair records
            up-to-date - Driving 10-12 hours a day.
          </div>
          <div className={`${styles.bookingOverwiewCard} ${styles.secondCard}`}>
            <h6 className={styles.bookingOverwiewCardTitle}>Additional details</h6>
            <ul className={styles.additionalDeailsContainer}>
              <li className={styles.additionalDeailsElement}>
                <div className={styles.additionalDeailsProp}>Employer</div>
                <div className={styles.additionalDeailsData}>
                  <img src={Logo} /> Jhon Walker
                </div>
              </li>
              <li className={styles.additionalDeailsElement}>
                <div className={styles.additionalDeailsProp}>Published</div>
                <div className={styles.additionalDeailsData}> 27.07.2021</div>
              </li>
              <li className={styles.additionalDeailsElement}>
                <div className={styles.additionalDeailsProp}>Start Location</div>
                <div className={styles.additionalDeailsData}>Ukrainska st., 29</div>
              </li>
              <li className={styles.additionalDeailsElement}>
                <div className={styles.additionalDeailsProp}>End Location</div>
                <div className={styles.additionalDeailsData}>Shevchenko sq., 1</div>
              </li>

              <li className={styles.additionalDeailsElement}>
                <div className={styles.additionalDeailsProp}>Payment</div>
                <div className={styles.additionalDeailsData}>$8 / hr</div>
              </li>
            </ul>
          </div>
          <div className={`${styles.bookingOverwiewCard} ${styles.thirdCard}`}>
            <h6 className={styles.bookingOverwiewCardTitle}>Status</h6>
            <div className={styles.statusContent}>
              <div className={styles.statusRepives}>This job has already recipved 9 applicants</div>
              <div className={styles.icons}>
                <img className={styles.logo} src={Logo} alt='Applicant Logo 1' />
                <img className={styles.logo} src={Logo} alt='Applicant Logo 2' />
                <img className={styles.logo} src={Logo} alt='Applicant Logo 3' />
                <img className={styles.logo} src={Logo} alt='Applicant Logo 4' />
                <img className={styles.logo} src={Logo} alt='Applicant Logo 5' />
                <div className={styles.additional}>+6</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingOverview;
