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
          isPrivate: true,
          canAccess: ['PLATFORM_ADMIN', 'FACILITY_MANAGER'],
        },
      ],
    },
    {
      title: 'Timecards',
      icon: Timecard,
      path: '/timecard',
      mainPath: '/timecard',
      isPrivate: true,
      canAccess: ['PLATFORM_ADMIN', 'FACILITY_MANAGER'],
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
      mainPath: '/chat',
      path: '/chat',
      items: [],
    },
    {
      title: 'Payments',
      icon: Payment,
      mainPath: '/payments',
      path: '/payments',
      items: [],
      isPrivate: true,
      canAccess: ['PLATFORM_ADMIN', 'FACILITY_MANAGER'],
    },
    {
      title: 'Users',
      icon: UserCog,
      mainPath: '/users',
      path: '/users',
      items: [],
      isPrivate: true,
      canAccess: ['PLATFORM_ADMIN'],
    },
  ] as NavItem[],
};
