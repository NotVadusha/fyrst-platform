import { Notification } from 'shared/packages/notification/types/notification';
import { apiSlice } from '../../api';

export const notificationsApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<Notification[], number>({
      query: userId => `/notification/${userId}`,
      providesTags: ['Notifications'],
    }),
    markAsRead: builder.mutation<Notification, number>({
      query: notificationId => ({
        url: `/notification/mark-as-read/${notificationId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notifications'],
    }),
    createNotification: builder.mutation<Notification, number>({
      query: userId => ({
        url: `notification-config/${userId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Notification config'],
    }),
    deleteNotification: builder.mutation<Notification, number>({
      query: notificationId => ({
        url: `notification-config/${notificationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notification config'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useCreateNotificationMutation,
  useDeleteNotificationMutation,
} = notificationsApi;
