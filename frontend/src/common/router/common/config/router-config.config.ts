import { ReactComponent as Booking } from 'src/assets/icons/booking.svg';
import { ReactComponent as Timecard } from 'src/assets/icons/timecard.svg';
import { ReactComponent as Profile } from 'src/assets/icons/profile.svg';
import { ReactComponent as Message } from 'src/assets/icons/message.svg';
import { ReactComponent as Payment } from 'src/assets/icons/payment.svg';
import { ReactComponent as Invoice } from 'src/assets/icons/invoice.svg';
import { ReactComponent as Proposal } from 'src/assets/icons/proposal.svg';
import { ReactComponent as Calendar } from 'src/assets/icons/calendar.svg';
import { NavItem } from '../types/NavItem';
import { ReactComponent as Chart } from 'src/assets/icons/chart.svg';
import { UserCog, BarChart3, Briefcase } from 'lucide-react';

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
          neededPermission: 'manageBookings',
        },
      ],
    },
    {
      title: 'Timecards',
      icon: Timecard,
      path: '/timecard',
      mainPath: '/timecard',
      isPrivate: true,
      neededPermission: 'manageTimecards',
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
          title: 'Portfolio',
          path: '/profile/portfolio',
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
      neededPermission: 'manageTimecards',
    },
    {
      title: 'Invoices',
      icon: Invoice,
      mainPath: '/invoices',
      path: '/invoices',
      items: [],
      isPrivate: true,
      neededPermission: 'manageTimecards',
    },
    {
      title: 'Users',
      icon: UserCog,
      mainPath: '/users',
      path: '/users',
      items: [],
      isPrivate: true,
      neededPermission: 'manageUsers',
    },
    {
      title: 'Reports',
      icon: BarChart3,
      mainPath: '/reports',
      path: '/reports',
      items: [],
      isPrivate: true,
      neededRoles: ['FACILITY_MANAGER'],
    },
    // {
    //   title: 'Interview',
    //   icon: Proposal,
    //   mainPath: '/meeting-chat',
    //   path: '/meeting-chat',
    // },
    { title: 'Calendar', icon: Calendar, mainPath: '/calendar', path: '/calendar', items: [] },
  ] as NavItem[],
};
