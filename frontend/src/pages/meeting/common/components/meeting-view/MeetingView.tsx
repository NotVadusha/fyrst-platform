import React, { useContext, useEffect, useState } from 'react';
import { useMeeting } from '@videosdk.live/react-sdk';
import { ParticipantView } from '../participant-view/ParticipantView';
import { Button } from 'src/common/components/ui/common/Button';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { MainControls } from '../controls/main-controls/MainControls';
import { useAppSelector } from 'src/common/hooks/redux';
import { ReactComponent as VideoParticipantsIcon } from 'src/assets/icons/video-participants.svg';
import { ReactComponent as VideoChatIcon } from 'src/assets/icons/video-chat.svg';
import { MeetingChat } from '../meeting-chat/MeetingChat';
import { SocketContext } from 'src/common/config/packages/socket/socket.config';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from 'src/common/components/ui/common/Sheet/Sheet';
import { VideoMeetingChat } from '../chat/VideoMeetingChat';

const MeetingView = ({
  onMeetingLeave,
  meetingId,
}: {
  onMeetingLeave: () => void;
  meetingId: string;
}) => {
  const [joined, setJoined] = useState<string | null>(null);

  const { join } = useMeeting();

  const socket = useContext(SocketContext);

  const { participants } = useMeeting({
    onMeetingJoined: () => {
      setJoined('JOINED');
    },
    onMeetingLeft: () => {
      onMeetingLeave();
    },
    onSpeakerChanged: activeSpeakerId => {
      console.log('active speaker', activeSpeakerId);
    },
  });

  const joinMeeting = () => {
    setJoined('JOINING');
    join();
  };

  const user = useAppSelector(state => state.user);
  console.log(meetingId);

  useEffect(() => {}, [meetingId]);

  const [showMeetingChat, setShowMeetingChat] = useState(false);

  const toggleMeetingChat = () => {
    setShowMeetingChat(!showMeetingChat);
  };

  return (
    <div className='flex justify-center items-center h-screen bg-black'>
      {joined && joined === 'JOINED' ? (
        <>
          <div className='grid content-between h-screen ml-6 z-60'>
            <div className='grid grid-cols-1 md:grid-cols-2 mt-5 bg-black'>
              {[...participants.keys()].map(participantId => (
                <div className='flex flex-wrap' key={participantId}>
                  <ParticipantView participantId={participantId} />
                </div>
              ))}
            </div>
            <div className='flex justify-between items-center pb-6'>
              <p className='text-center text-white'>
                {user.first_name} {user.last_name}
              </p>
              <MainControls />
              <div className='flex align-center items-center'>
                <Button
                  variant='controls'
                  size='controls'
                  className='mr-6'
                  onClick={() => console.log('mock')}
                >
                  <VideoParticipantsIcon />
                </Button>

                <Sheet>
                  <SheetTrigger>
                    <Button variant='controls' size='controls' className='mr-6'>
                      <VideoChatIcon />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side={'right'}>
                    <SheetHeader>
                      <SheetTitle>
                        <span className='text-blue font-semibold text-xl'>Chat</span>
                        <hr className='border-b border-1 border-grey/80 my-4' />
                        <p className='text-dark-grey text-xs leading-4	'>
                          Only meeting participants can send and view messages. When the meeting has
                          ended, the messages disappear.
                        </p>
                      </SheetTitle>
                      <VideoMeetingChat />
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </>
      ) : joined && joined === 'JOINING' ? (
        <Spinner />
      ) : (
        <Button
          onClick={joinMeeting}
          className='w-[170px] flex justify-center items-center md:w-1/6'
        >
          Join
        </Button>
      )}
    </div>
  );
};

export { MeetingView };
