import React, { useState } from 'react';
import { useMeeting } from '@videosdk.live/react-sdk';
import { ParticipantView } from '../participant-view/ParticipantView';
import { Button } from 'src/common/components/ui/common/Button';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { Controls } from '../controls/Controls';

const MeetingView = ({
  onMeetingLeave,
  meetingId,
}: {
  onMeetingLeave: () => void;
  meetingId: string;
}) => {
  const [joined, setJoined] = useState<string | null>(null);
  const { join } = useMeeting();
  const { participants } = useMeeting({
    onMeetingJoined: () => {
      setJoined('JOINED');
    },
    onMeetingLeft: () => {
      onMeetingLeave();
    },
  });
  const joinMeeting = () => {
    setJoined('JOINING');
    join();
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      {joined && joined === 'JOINED' ? (
        <>
          <div>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-5'>
              {[...participants.keys()].map(participantId => (
                <div className='grid grid-cols-1 md:grid-cols-2 mt-5' key={participantId}>
                  <ParticipantView participantId={participantId} />
                </div>
              ))}
            </div>
            <div className='absolute mt-5'>
              <div className='flex align-center items-center'>
                <p className='text-center mr-8'>Meeting ID: {meetingId}</p>
                <Controls />
              </div>
            </div>
          </div>
        </>
      ) : joined && joined === 'JOINING' ? (
        <Spinner />
      ) : (
        <Button onClick={joinMeeting} className='w-1/6'>
          Join
        </Button>
      )}
    </div>
  );
};

export { MeetingView };
