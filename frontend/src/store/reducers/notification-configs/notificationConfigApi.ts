import { NotificationsConfig } from 'types/models/NotificationsConfig';
import { apiSlice } from '../apiSlice';

export const notificationConfigApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getNotificationsConfig: builder.query<NotificationsConfig, number>({
      query: userId => `notification-config/${userId}`,
      providesTags: ['Notification config'],
    }),
    createNotificationsConfig: builder.mutation<NotificationsConfig, { userId: number }>({
      query: config => ({
        url: 'notification-config',
        method: 'POST',
        body: config,
      }),
      invalidatesTags: ['Notification config'],
    }),
    updateNotificationsConfig: builder.mutation<NotificationsConfig, Partial<NotificationsConfig>>({
      query: updatedConfig => ({
        url: 'notification-config',
        method: 'PATCH',
        body: updatedConfig,
      }),
      invalidatesTags: ['Notification config'],
    }),
    deleteNotificationsConfig: builder.mutation<NotificationsConfig, number>({
      query: userId => ({
        url: `notification-config/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notification config'],
    }),
  }),
});

export const {
  useGetNotificationsConfigQuery,
  useCreateNotificationsConfigMutation,
  useUpdateNotificationsConfigMutation,
  useDeleteNotificationsConfigMutation,
} = notificationConfigApi;
