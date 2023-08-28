import { ReactComponent as Booking } from '../icons/booking.svg';
import { ReactComponent as Timecard } from '../icons/timecard.svg';
import { ReactComponent as Profile } from '../icons/profile.svg';
import { ReactComponent as Message } from '../icons/message.svg';
import { ReactComponent as Payment } from '../icons/payment.svg';
import { NavItem } from 'types';

export const siteConfig = {
  name: 'Fyrst',
  description: '',
  url: '',
  mainNav: [
    {
      title: 'Bookings',
      icon: Booking,
      path: '/booking',
      items: [
        {
          title: 'Create booking',
          path: '/booking/create',
        },
      ],
    },
    {
      title: 'Timecards',
      icon: Timecard,
      path: '/timecard',
    },
    {
      title: 'Profile',
      icon: Profile,
      path: '/profile',
      items: [
        {
          title: 'Edit profile',
          path: '/profile/edit',
        },
        {
          title: 'Notifications',
          path: '/profile/notifications',
        },
        {
          title: 'Security',
          path: '/profile/security',
        },
      ],
    },
    {
      title: 'Messages',
      icon: Message,
      path: '/chat',
      items: [],
    },
    {
      title: 'Payments',
      icon: Payment,
      path: '/payments',
      items: [],
    },
  ] as NavItem[],
};
