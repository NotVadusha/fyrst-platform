import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import BookingPage from '../pages/bookings/BookingPage';
import TimeCardPage from '../pages/timecards/main/TimeCard';
import ProfilePage from '../pages/profiles/ProfilePage';
import ProfileEditPage from '../pages/profiles/ProfileEditPage';
import MessangerPage from '../pages/messanger/MessangerPage';
import PaymentsPage from '../pages/payments/PaymentsPage';
import SignInPage from '../pages/signin/SignInPage';
import EmployesPage from '../pages/EmployesPage';
import ErrorPage from '../pages/common/ErrorPage';
import TestPage from '../pages/common/TestPage';
import NotFoundPage from '../pages/common/NotFoundPage';
import Layout from '../pages/common/Layout';
import BookingOverview from '../components/BookingOverview/BookingOverview';
import SignUpPage from 'src/pages/signup/SignUpPage';
import SuccessGoogleAuthPage from 'src/pages/success-google-auth/SuccessGoogleAuthPage';
import CreateTimeCardPage from 'src/pages/timecards/create/CreateTimeCard';
import ViewTimeCardPage from 'src/pages/timecards/view/ViewTimeCard';
import { UserListPage } from 'src/pages/users/UserListPage';
import ForgotPage from 'src/pages/forgot/ForgotPage';
import EmailSentPage from 'src/pages/email-sent/EmailSentPage';
import ResetPage from 'src/pages/reset/ResetPage';
import Notifications from '../components/Notifications/Notifications';
import { CreateBookingPage } from 'src/pages/bookings/CreateBookingPage/CreateBookingPage';

export const baseUrl = process.env.REACT_APP_API_URL;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,

    children: [
      {
        path: 'booking',
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <BookingPage />,
          },
          {
            path: ':id',
            element: <BookingOverview />,
          },
          {
            path: 'create',
            element: <CreateBookingPage />,
          },
        ],
      },
      {
        path: 'timecard',
        children: [
          {
            index: true,
            element: <TimeCardPage />,
          },
          {
            path: ':id',
            element: <ViewTimeCardPage />,
          },
          {
            path: 'create/:bookingId',
            element: <CreateTimeCardPage />,
          },
        ],
      },
      {
        path: 'profile',
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <ProfilePage />,
          },
          {
            path: 'edit',
            element: <ProfileEditPage />,
            loader: async ({ params }) => {
              return {
                user: {
                  first_name: 'Joe',
                  last_name: 'Doe',
                  email: 'jd@gmail.com',
                  phone_number: '+3',
                  city: 'New York',
                  birthdate: '2004-12-12',
                  role_id: 1,
                },
              };
              // try {
              // const navigate = useNavigate();
              // const location = useLocation();
              //   const userToken = jwt.decide(localStorage.getItem('accessToken'));
              //   const userId = user.payload.id
              // if (!userTokenID) {
              //   navigate('/auth/login', { state: { from: location }, replace: true });
              // }
              //   const user = await fetch(`${baseUrl}/user/${userId}`);
              //   const userProfile = await fetch(`${baseUrl}/profile/${userId}`)
              //   return {user: {...user}, profile: {...profile}}
              // } catch (err) {
              //   throw err;
              // }
            },
          },
          {
            path: 'notifications',
            element: <Notifications />,
          },
          {
            path: 'security',
            element: <TestPage />,
          },
        ],
      },
      {
        path: '/chat',
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <MessangerPage />,
          },
        ],
      },
      {
        path: 'payments',
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <PaymentsPage />,
          },
          {
            path: ':id',
            element: <TestPage />,
          },
        ],
      },
      {
        path: 'employee',
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <EmployesPage />,
          },
        ],
      },
      {
        path: 'users',
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <UserListPage />,
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: 'signin',
        element: <SignInPage />,
      },
      {
        path: 'forgot/email-sended',
        element: <EmailSentPage />,
      },
      {
        path: 'forgot',
        element: <ForgotPage />,
      },
      {
        path: 'reset',
        element: <ResetPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'google-success',
        element: <SuccessGoogleAuthPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
