import React from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import BookingPage from '../../pages/bookings/ListBookingPage/BookingPage';
import TimeCardPage from '../../pages/timecards/main/TimeCard';
import ProfilePage from '../../pages/profiles/ProfilePage';
import ProfileEditPage from '../../pages/profiles/ProfileEditPage';
import MessangerPage from '../../pages/messenger/MessangerPage';
import { PaymentsPage } from '../../pages/payments/PaymentsList/PaymentsPage';
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
import NotificationsSettings from '../../pages/notifications-settings/NotificationsSettings';
import ProfileSecurity from '../../pages/profiles/ProfileSecurity/ProfileSecurity';
import { CreateBookingPage } from 'src/pages/bookings/CreateBookingPage/CreateBookingPage';
import { App } from 'src/pages/App';
import { ConfigurateProtectedRoute } from './common/helpers/configurate-protected-route.helper';
import { RoleProtectedRoute } from './common/helpers/role-protected-route.helper';
import { PermissionsProtectedRoute } from './common/helpers/permissions-protected-route.helper';
import { ReportsPage } from 'src/pages/reports/ReportsPage';

//TODO: Add one component for all pages
import { ChatPage } from 'src/pages/messenger/common/chat/Chat';
import { SearchChatMessagesPage } from 'src/pages/messenger/common/chat/search/SearchChatMessagesPage';
import SelectMessagePage from 'src/pages/messenger/SelectMessagePage';
import { SharedMediaPage } from 'src/pages/messenger/common/chat/media/SharedMediaPage';
import VerifyEmailPage from '../../pages/authentication/verify-email/VerifyEmailPage';
import PortfolioPage from 'src/pages/profiles/portfolio/PortfolioPage';
import JobRecommendations from 'src/pages/bookings/recommendations/JobRecommendations';
import { JoinScreen } from 'src/pages/meeting/JoinScreen';

import InvoicesPage from 'src/pages/invoices/InvoicesPage';
import { CalendarPage } from 'src/pages/calendar/CalendarPage';
import { Payment } from 'src/pages/payments/Payment/Payment';
import BookingPageLayout from '../../pages/bookings/ListBookingPage/BookingPageLayout';
import InterviewPage from 'src/pages/bookings/inverview/InterviewPage';
import InvitationPage from 'src/pages/bookings/inverview/invitation/InvitationPage';
import { BurgerMenuProvider } from '../context/BurgerMenuContext';
import { VideoMeeting } from 'src/pages/meeting/VideoMeeting';

export const baseUrl = process.env.REACT_APP_API_URL;

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: (
          <ConfigurateProtectedRoute>
            <BurgerMenuProvider>
              <Layout />
            </BurgerMenuProvider>
          </ConfigurateProtectedRoute>
        ),
        children: [
          {
            path: 'calendar',
            errorElement: <ErrorPage></ErrorPage>,
            children: [{ index: true, element: <CalendarPage></CalendarPage> }],
          },
          {
            path: 'booking',
            errorElement: <ErrorPage />,
            children: [
              {
                path: '',
                element: <BookingPageLayout />,
                children: [
                  {
                    index: true,
                    element: <BookingPage />,
                  },
                  {
                    path: 'interview',
                    element: <InterviewPage />,
                  },
                  {
                    path: 'recommendation',
                    element: <JobRecommendations />,
                  },
                ],
              },
              {
                path: 'interview/:id',
                element: <InvitationPage />,
              },
              {
                path: ':id',
                element: <BookingOverview />,
              },
              {
                path: 'create',
                element: (
                  <RoleProtectedRoute role='FACILITY_MANAGER' strict={false}>
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
                  <RoleProtectedRoute role='FACILITY_MANAGER' strict={false}>
                    <PermissionsProtectedRoute permissions={['manageTimecards']}>
                      <TimeCardPage />
                    </PermissionsProtectedRoute>
                  </RoleProtectedRoute>
                ),
              },
              {
                path: ':id',
                element: (
                  <RoleProtectedRoute role='FACILITY_MANAGER' strict={false}>
                    <PermissionsProtectedRoute permissions={['manageTimecards']}>
                      <ViewTimeCardPage />
                    </PermissionsProtectedRoute>
                  </RoleProtectedRoute>
                ),
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
                path: '', // This represents the default outlet when no chatId is provided
                element: <SelectMessagePage />,
              },
              {
                path: ':chatId',
                element: <ChatPage />,
              },
              {
                path: ':chatId/search',
                element: <SearchChatMessagesPage />,
              },
              {
                path: ':chatId/media',
                element: <SharedMediaPage />,
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
                path: 'portfolio',
                element: <PortfolioPage />,
              },
              {
                path: 'edit',
                element: <ProfileEditPage />,
              },
              {
                path: 'notifications',
                element: <NotificationsSettings />,
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
          // {
          //   path: '/meeting-chat',
          //   errorElement: <ErrorPage />,
          //   element: <JoinScreen />,
          // },
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
                element: <Payment />,
              },
            ],
          },
          {
            path: 'invoices',
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <InvoicesPage />,
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
                  <RoleProtectedRoute role='FACILITY_MANAGER' strict={false}>
                    <PermissionsProtectedRoute permissions={['manageUsers']}>
                      <UserListPage />
                    </PermissionsProtectedRoute>
                  </RoleProtectedRoute>
                ),
              },
            ],
          },
          {
            path: 'reports',
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: (
                  <RoleProtectedRoute role='FACILITY_MANAGER' strict>
                    <ReportsPage />
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
        path: '/meeting-chat/:id',
        errorElement: <ErrorPage />,
        element: <VideoMeeting />,
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
            path: 'verify-email',
            element: <VerifyEmailPage />,
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
