import React from 'react';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { MeetingProvider, MeetingConsumer } from '@videosdk.live/react-sdk';
import { createMeeting } from './common/api/meeting.api';
import { AUTH_TOKEN } from './common/constants/constants';
import { JoinScreen, MeetingView } from './common/components/index';

export function VideoMeeting() {
  const { id: meetingId } = useParams();

  if (!meetingId) return <>Not found</>;

  const navigate = useNavigate();

  return (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: '',
      }}
      joinWithoutUserInteraction={true}
      token={AUTH_TOKEN!}
    >
      <MeetingConsumer>
        {() => (
          <MeetingView meetingId={meetingId} onMeetingLeave={() => navigate('/meeting-chat')} />
        )}
      </MeetingConsumer>
    </MeetingProvider>
  );
}
