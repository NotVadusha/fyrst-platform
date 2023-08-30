import { ReactComponent as Booking } from 'src/assets/icons/booking.svg';
import { ReactComponent as Timecard } from 'src/assets/icons/timecard.svg';
import { ReactComponent as Profile } from 'src/assets/icons/profile.svg';
import { ReactComponent as Message } from 'src/assets/icons/message.svg';
import { ReactComponent as Payment } from 'src/assets/icons/payment.svg';
import { NavItem } from '../types/NavItem';
import { UserCog } from 'lucide-react';

export const routerConfig = {
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
      mainPath: '/messanger',
      path: '/messanger',
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
