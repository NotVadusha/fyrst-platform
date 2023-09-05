import React, { useState } from 'react';
import { MeetingProvider, MeetingConsumer } from '@videosdk.live/react-sdk';
import { authToken, createMeeting } from './common/api/meeting-chat.api';
import { JoinScreen } from './common/components/join-screen/JoinScreen';
import { MeetingView } from './common/components/meeting-view/MeetingView';

export function MeetingChat() {
  const [meetingId, setMeetingId] = useState<string | null>(null);

  const getMeetingAndToken = async (id?: string) => {
    const meetingId = id;
    if (meetingId) {
      setMeetingId(meetingId);
    }
  };

  const onCreate = async () => {
    const newMeetingId = await createMeeting({ token: authToken });
    setMeetingId(newMeetingId);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: '',
      }}
      token={authToken}
    >
      <MeetingConsumer>
        {() => <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />}
      </MeetingConsumer>
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} handleCreate={onCreate} />
  );
}
