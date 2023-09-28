import React, { useContext, useEffect, useState } from 'react';
import { useMeeting } from '@videosdk.live/react-sdk';
import { ParticipantView } from '../participant-view/ParticipantView';
import { Button } from 'src/common/components/ui/common/Button';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { MainControls } from '../controls/main-controls/MainControls';
import { useAppDispatch, useAppSelector } from 'src/common/hooks/redux';
import { ReactComponent as VideoParticipantsIcon } from 'src/assets/icons/video-participants.svg';
import { ReactComponent as VideoChatIcon } from 'src/assets/icons/video-chat.svg';
import { SocketContext } from 'src/common/config/packages/socket/socket.config';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from 'src/common/components/ui/common/Sheet/Sheet';
import { VideoMeetingChat } from '../chat/VideoMeetingChat';
import { TokenResponseDto } from 'src/common/packages/authentication/login/types/dto/TokenResponseDto';
import jwtDecode from 'jwt-decode';
import { JWTPayload } from 'shared/packages/authentication/types/JWTPayload';
import { useGetUserQuery } from 'src/common/store/api/packages/user/userApi';
import { DecodedUser } from 'src/common/packages/user/types/models/User.model';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { setUser } from 'src/common/store/slices/packages/user/userSlice';
import { addMessage } from 'src/common/store/slices/packages/meeting/meetingSlice';

const MeetingView = ({
  onMeetingLeave,
  meetingId,
}: {
  onMeetingLeave: () => void;
  meetingId: string;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { leave } = useMeeting();

  const socket = useContext(SocketContext);
  const user = useAppSelector(state => state.user);

  const { participants } = useMeeting({
    onMeetingJoined: () => {
      setIsLoading(false);
    },
    onMeetingLeft: () => {
      onMeetingLeave();
    },
  });

  const token = localStorage.getItem('accessToken');
  let decode: DecodedUser | undefined;

  if (token) {
    decode = jwtDecode(token);
  }

  const { data } = useGetUserQuery(decode?.id ?? skipToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.id) return;

    socket.emit('user-join-meeting', { meetingId });

    dispatch(setUser(data));

    return () => leave();
  }, [data, meetingId]);

  useEffect(() => {
    socket.on('new-meeting-message', payload => {
      dispatch(addMessage(payload));
    });

    return () => {
      socket.off('new-meeting-message');
    };
  }, []);

  return (
    <div className='flex justify-center items-center h-screen bg-black'>
      {isLoading ? (
        <Spinner size='lg' color='bg-white' />
      ) : (
        <div className='grid content-between h-screen ml-6 z-60'>
          <div className='grid grid-cols-1 md:grid-cols-2 mt-5 bg-black gap-6'>
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
                    <VideoMeetingChat meetingId={meetingId} />
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { MeetingView };
