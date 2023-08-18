import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import BookingPage from '../pages/bookings/BookingPage';
import TimeCardPage from '../pages/timecards/TimeCard';
import ProfilePage from '../pages/profiles/ProfilePage';
import MessangerPage from '../pages/messanger/MessangerPage';
import PaymentsPage from '../pages/payments/PaymentsPage';
import AuthPage from '../pages/authentication/AuthPage';
import EmployesPage from '../pages/EmployesPage';
import ErrorPage from '../pages/common/ErrorPage';
import TestPage from '../pages/common/TestPage';
import NotFoundPage from '../pages/common/NotFoundPage';
import Layout from '../pages/common/Layout';

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
            element: <TestPage />,
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
            element: <TestPage />,
          },
          {
            path: 'create',
            element: <TestPage />,
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
            path: ':id',
            element: <TestPage />,
          },
          {
            path: 'edit',
            element: <TestPage />,
          },
          {
            path: 'notifications',
            element: <TestPage />,
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
        path: 'payment',
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
        path: 'Employe',
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
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: 'login',
        element: <AuthPage />,
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
        element: <TestPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
