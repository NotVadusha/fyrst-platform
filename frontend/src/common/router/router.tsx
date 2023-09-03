import React from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import BookingPage from '../../pages/bookings/ListBookingPage/BookingPage';
import TimeCardPage from '../../pages/timecards/main/TimeCard';
import ProfilePage from '../../pages/profiles/ProfilePage';
import ProfileEditPage from '../../pages/profiles/ProfileEditPage';
import MessengerPage from '../../pages/messenger/MessangerPage';
import PaymentsPage from '../../pages/payments/PaymentsPage';
import SignInPage from '../../pages/authentication/signin/SignInPage';
import EmployeesPage from '../../pages/employees/EmployeesPage';
import ErrorPage from '../../pages/common/error/ErrorPage';
import TestPage from '../../pages/common/test-page/TestPage';
import Layout from '../../pages/common/layout/Layout';
import BookingOverview from '../../pages/bookings/BookingOverview/BookingOverview';
import SignUpPage from 'src/pages/authentication/signup/SignUpPage';
import SuccessGoogleAuthPage from 'src/pages/authentication/success-google-auth/SuccessGoogleAuthPage';
import CreateTimeCardPage from 'src/pages/timecards/create/CreateTimeCard';
import ViewTimeCardPage from 'src/pages/timecards/view/ViewTimeCard';
import { UserListPage } from 'src/pages/users/UserListPage';
import ForgotPage from 'src/pages/authentication/forgot/ForgotPage';
import EmailSentPage from 'src/pages/authentication/email-sent/EmailSentPage';
import ResetPage from 'src/pages/authentication/reset/ResetPage';
import Notifications from '../../pages/notifications/Notifications';
import ProfileSecurity from '../../pages/profiles/ProfileSecurity/ProfileSecurity';
import { CreateBookingPage } from 'src/pages/bookings/CreateBookingPage/CreateBookingPage';
import { App } from 'src/pages/App';
import { ConfigurateProtectedRoute } from './common/helpers/configurate-protected-route.helper';
import { RoleProtectedRoute } from './common/helpers/role-protected-route.helper';
import { PermissionsProtectedRoute } from './common/helpers/permissions-protected-route.helper';

//TODO: Add one component for all pages
import { ChatPage } from 'src/pages/messenger/common/chat/Chat';

export const baseUrl = process.env.REACT_APP_API_URL;

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: (
          <ConfigurateProtectedRoute>
            <Layout />
          </ConfigurateProtectedRoute>
        ),
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
                element: (
                  <RoleProtectedRoute role='FACILITY_MANAGER'>
                    <PermissionsProtectedRoute permissions={['manageBookings']}>
                      <CreateBookingPage />
                    </PermissionsProtectedRoute>
                  </RoleProtectedRoute>
                ),
              },
            ],
          },
          {
            path: 'timecard',
            children: [
              {
                index: true,
                element: (
                  <RoleProtectedRoute role='FACILITY_MANAGER'>
                    <PermissionsProtectedRoute permissions={['manageTimecards']}>
                      <TimeCardPage />
                    </PermissionsProtectedRoute>
                  </RoleProtectedRoute>
                ),
              },
              {
                path: ':id',
                element: (
                  <RoleProtectedRoute role='FACILITY_MANAGER'>
                    <PermissionsProtectedRoute permissions={['manageTimecards']}>
                      <ViewTimeCardPage />
                    </PermissionsProtectedRoute>
                  </RoleProtectedRoute>
                ),
              },
              {
                path: 'create/:bookingId',
                element: (
                  <RoleProtectedRoute role='FACILITY_MANAGER'>
                    <PermissionsProtectedRoute permissions={['manageTimecards']}>
                      <CreateTimeCardPage />
                    </PermissionsProtectedRoute>
                  </RoleProtectedRoute>
                ),
              },
            ],
          },
          {
            path: '/chat',
            errorElement: <ErrorPage />,
            element: <MessengerPage />,
            children: [
              {
                path: ':chatId',
                element: <ChatPage />,
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
                element: <ProfileSecurity />,
              },
            ],
          },
          {
            path: 'messanger',
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <MessengerPage />,
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
                element: <EmployeesPage />,
              },
            ],
          },
          {
            path: 'users',
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: (
                  <RoleProtectedRoute role='FACILITY_MANAGER'>
                    <PermissionsProtectedRoute permissions={['manageUsers']}>
                      <UserListPage />
                    </PermissionsProtectedRoute>
                  </RoleProtectedRoute>
                ),
              },
            ],
          },
          {
            path: '*',
            index: true,
            element: <Navigate to='/booking' replace />,
          },
        ],
      },
      {
        path: '/auth',
        errorElement: <ErrorPage />,
        children: [
          {
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
          {
            path: '*',
            index: true,
            element: <Navigate to='/auth/signup' replace />,
          },
        ],
      },
    ],
  },
]);
