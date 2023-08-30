import { ReactComponent as Booking } from '../icons/booking.svg';
import { ReactComponent as Timecard } from '../icons/timecard.svg';
import { ReactComponent as Profile } from '../icons/profile.svg';
import { ReactComponent as Message } from '../icons/message.svg';
import { ReactComponent as Payment } from '../icons/payment.svg';
import { NavItem } from 'types';
import { UserCog } from 'lucide-react';

export const siteConfig = {
  name: 'Fyrst',
  description: '',
  url: '',
  mainNav: [
    {
      title: 'Bookings',
      icon: Booking,
      mainPath: '/booking',
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
      mainPath: '/timecard',
    },
    {
      title: 'Profile',
      icon: Profile,
      mainPath: '/profile',
      path: '/profile/edit',
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
      mainPath: '/payments',
      path: '/payments',
      items: [],
    },
    {
      title: 'Users',
      icon: UserCog,
      mainPath: '/users',
      path: '/users',
      items: [],
    },
  ] as NavItem[],
};
