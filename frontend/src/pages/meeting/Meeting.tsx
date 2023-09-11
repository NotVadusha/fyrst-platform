import React, { useState } from 'react';
import { MeetingProvider, MeetingConsumer } from '@videosdk.live/react-sdk';
import { createMeeting } from './common/api/meeting.api';
import { AUTH_TOKEN } from './common/constants/constants';
import { JoinScreen, MeetingView } from './common/components/index';

const Meeting = () => {
  const [meetingId, setMeetingId] = useState<string | null>(null);

  const getMeetingAndToken = async (id?: string) => {
    const meetingId = id;
    if (meetingId) {
      setMeetingId(meetingId);
    }
  };

  const onCreate = async () => {
    const newMeetingId = await createMeeting();
    setMeetingId(newMeetingId);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return AUTH_TOKEN && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: '',
      }}
      token={AUTH_TOKEN}
    >
      <MeetingConsumer>
        {() => <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />}
      </MeetingConsumer>
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} handleCreate={onCreate} />
  );
};
export { Meeting };
