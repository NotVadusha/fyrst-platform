import Logo from '../../icons/user-logo.png';

export const getBookingData = (id: string) => {
  return {
    jobTitle: 'Driver',
    description:
      'Drivers are responsible for transporting clients or handling deliveries in a timely manner, and they may have to work nights and weekends to accomplish their duties. Common duties and responsibilities for drivers are to: - Transport clients and/or packages to and from destinations - Arrive at destinations on schedule - Fulfill administrative needs, like office pickups - Research and plan for traffic, construction and weather delays - Use navigation applications to determine the best route - Interact with clients professionally at all times - Ensure that the vehicle is always fueled and ready for use - Arrange for vehicle repairs as needed - Keep mileage records and repair records up-to-date - Driving 10-12 hours a day.',
    employer: 'John Walker',
    publishedDate: '27.07.2021',
    startLocation: 'Ukrainska st., 29',
    endLocation: 'Shevchenko sq., 1',
    hourlyRate: 8,
    avatar: Logo,
    avatars: [Logo, Logo, Logo, Logo, Logo],
    numOfPeopleReceived: 8,
  };
};
