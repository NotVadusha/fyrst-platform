import React, { useState } from 'react';
import { useMeeting } from '@videosdk.live/react-sdk';
import { ParticipantView } from '../participant-view/ParticipantView';
import { Button } from 'src/common/components/ui/common/Button';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { Controls } from '../controls/Controls';
import { useAppSelector } from 'src/common/hooks/redux';
import { VideoChat } from '../video-chat/VideoChat';

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

  const user = useAppSelector(state => state.user);
  console.log(meetingId);

  return (
    <div className='flex justify-center items-center h-screen bg-black'>
      {joined && joined === 'JOINED' ? (
        <>
          <div className='grid content-between h-screen ml-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-5 bg-black'>
              {[...participants.keys()].map(participantId => (
                <div className='grid grid-cols-1 md:grid-cols-2' key={participantId}>
                  <ParticipantView participantId={participantId} />
                </div>
              ))}
            </div>
            <div className='flex justify-between items-center pb-6'>
              <p className='text-center text-white'>
                {user.first_name} {user.last_name}
              </p>
              <Controls />
              <VideoChat />
            </div>
          </div>
        </>
      ) : joined && joined === 'JOINING' ? (
        <Spinner />
      ) : (
        <Button onClick={joinMeeting} className='flex justify-center items-center w-1/6'>
          Join
        </Button>
      )}
    </div>
  );
};

export { MeetingView };
