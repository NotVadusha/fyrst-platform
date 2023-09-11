import { apiSlice } from '../../api';

export const invitationApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    createInvitation: build.mutation<
      string,
      { date: Date; time: string; employeeId: number; bookingId: number }
    >({
      query: data => {
        return {
          url: '/invitation',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const { useCreateInvitationMutation } = invitationApi;
