import React from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import BookingPage from '../pages/bookings/ListBookingPage/BookingPage';
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
import ProfileSecurity from '../components/ProfileSecurity/ProfileSecurity';
import { CreateBookingPage } from 'src/pages/bookings/CreateBookingPage/CreateBookingPage';
import { App } from 'src/pages/App';
import { ChatPage } from 'src/pages/messanger/common/chat/Chat';
import { LoginPrivateRoute } from './loginPrivateRoute';
import { useGetChatByIdQuery } from 'src/store/reducers/chat/chatApi';

export const baseUrl = process.env.REACT_APP_API_URL;

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: (
          <LoginPrivateRoute>
            <Layout />
          </LoginPrivateRoute>
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
            path: '/chat',
            errorElement: <ErrorPage />,
            element: <MessangerPage />,
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
