import { apiSlice } from '../../api';
import type { Invitation } from 'shared/invitatation';

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
    getInvitations: build.query<Invitation[], string>({
      query: () => '/invitation',
    }),
    getInvitation: build.query<Invitation, string>({
      query: id => `/invitation/${id}`,
    }),
    updateInvitation: build.mutation<
      Invitation,
      { id: string; meetingId?: string; status: Invitation['status'] }
    >({
      query: args => {
        return {
          url: `/invitation/${args.id}`,
          method: 'PATCH',
          body: { status: args.status, meetingId: args.meetingId },
        };
      },
    }),
  }),
});

export const {
  useCreateInvitationMutation,
  useGetInvitationsQuery,
  useUpdateInvitationMutation,
  useGetInvitationQuery,
} = invitationApi;
