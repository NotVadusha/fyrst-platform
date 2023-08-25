import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import BookingPage from '../pages/bookings/BookingPage';
import TimeCardPage from '../pages/timecards/TimeCard';
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
import GoogleSuccessPage from 'src/pages/google-success/GoogleSuccessPage';
import CreateTimeCardPage from 'src/pages/timecards/create/CreateTimeCard';
import ViewTimeCardPage from 'src/pages/timecards/view/ViewTimeCard';
import Notifications from '../components/Notifications/Notifications';

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
            element: <TestPage />,
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
            loader: async ({ params }) => {
              return {
                timecard: {
                  responsobilities: [
                    'Transport clients and/or packages to and from destinations',
                    'Arrive at destinations on schedule',
                    'Fulfill administrative needs, like office pickups',
                    'Research and plan for traffic, construction and weather delays',
                  ],
                  description: `Drivers are responsible for transporting clients or handling deliveries in a timely
                  manner, and they may have to work nights and weekends to accomplish their duties.`,
                  details: {
                    employee: 'Guy Hawkings',
                    facilityManager: 'Brooklyn Sirsad',
                    facility: 'Driver',
                    timecardType: 'Hourly',
                    hoursWorked: '16 hours',
                    lunchTaken: '3 hours',
                  },
                },
              };
              // try {
              //   return await fetch(`${baseUrl}/timecard/${params.id}`);
              // } catch (err) {
              //   throw err;
              // }
            },
          },
          {
            path: 'create',
            element: <CreateTimeCardPage />,
            // action: async ({ params, request }) => {
            //   const body = await request.formData();

            //   const res = await fetch(`${baseUrl}/timecard`, {
            //     method: 'POST',
            //     body,
            //   });

            //   if (!res.ok) {
            //     throw res;
            //   }
            //   return { ok: true };
            // },
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
        path: 'messanger',
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
        path: 'forgot',
        element: <TestPage />,
      },
      {
        path: 'reset',
        element: <TestPage />,
      },
      {
        path: 'reset/:key',
        element: <TestPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'google-sucess',
        element: <GoogleSuccessPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
