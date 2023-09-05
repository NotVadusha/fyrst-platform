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
        url: `notification/${userId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Notifications'],
    }),
    deleteNotification: builder.mutation<Notification, number>({
      query: notificationId => ({
        url: `notification/${notificationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notifications'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useCreateNotificationMutation,
  useDeleteNotificationMutation,
} = notificationsApi;
