import React, { useContext, useEffect, useState } from 'react';

import { ScrollArea } from 'src/common/components/ui/common/ScrollArea/ScrollArea';
import { SendHorizontal } from 'lucide-react';
import { SocketContext } from 'src/common/config/packages/socket/socket.config';
import { useAppSelector } from 'src/common/hooks/redux';
import { selectUser } from 'src/common/store/slices/packages/user/userSelectors';
import { format } from 'date-fns';
import { MeetingMessage } from 'shared/socketEvents';
import { v4 as uuidv4 } from 'uuid';

export function VideoMeetingChat({ meetingId }: { meetingId: string }) {
  const messages = useAppSelector(state => state.meeting.messages);

  const [value, setValue] = useState<string>('');
  const socket = useContext(SocketContext);

  const user = useAppSelector(selectUser);

  function sendMessage() {
    if (!value) return;

    socket.emit('new-meeting-message', {
      id: uuidv4(),
      messageContent: value,
      time: format(new Date(), 'p'),
      username: `${user.first_name} ${user.last_name ?? ''}`,
      meetingId,
    });
    setValue('');
  }

  return (
    <div className='relative h-[calc(100vh-8rem)]'>
      <ScrollArea className='h-[calc(100%-5rem)]'>
        <div className='flex flex-col gap-2 pr-4'>
          {messages?.map((message, idx) => (
            <div
              className='flex flex-col gap-2 p-4 rounded-md bg-inactive'
              key={`${idx}-${message.username}`}
            >
              <p className='text-black font-semibold text-xs'>{message.messageContent}</p>
              <div className='flex justify-between text-xs text-dark-grey'>
                <span>From {message.username}</span>
                <span>{message.time}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <input
        type='text'
        placeholder='Message'
        className='md:absolute bottom-2 focus:outline-blue mt-5 md:mt-0 p-4 mx:pr-12 rounded-2xl w-full bg-[#DBDBDB]'
        value={value}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            sendMessage();
          }
        }}
        onChange={e => setValue(e.target.value)}
      />
      <SendHorizontal
        className='absolute text-blue z-20 bottom-4 md:bottom-6 right-2'
        onClick={sendMessage}
      />
    </div>
  );
}
