import { apiSlice } from '../apiSlice';

export const notificationConfigApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getNotificationsConfig: builder.query({
      query: userId => `notification-config/${userId}`,
    }),
    createNotificationsConfig: builder.mutation({
      query: config => ({
        url: 'notification-config',
        method: 'POST',
        body: config,
      }),
    }),
    updateNotificationsConfig: builder.mutation({
      query: updatedConfig => ({
        url: 'notification-config',
        method: 'PATCH',
        body: updatedConfig,
      }),
    }),
    deleteNotificationsConfig: builder.mutation({
      query: userId => ({
        url: `notification-config/${userId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetNotificationsConfigQuery,
  useCreateNotificationsConfigMutation,
  useUpdateNotificationsConfigMutation,
  useDeleteNotificationsConfigMutation,
} = notificationConfigApi;
