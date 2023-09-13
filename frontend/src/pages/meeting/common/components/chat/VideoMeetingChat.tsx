import React, { useContext, useEffect, useState } from 'react';

import { ScrollArea } from 'src/common/components/ui/common/ScrollArea/ScrollArea';
import { SendHorizontal } from 'lucide-react';
import { SocketContext } from 'src/common/config/packages/socket/socket.config';
import { useAppSelector } from 'src/common/hooks/redux';
import { selectUser } from 'src/common/store/slices/packages/user/userSelectors';

interface Message {
  username: string;
  messageContent: string;
}

export function VideoMeetingChat({ meetingId }: { meetingId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);

  const [value, setValue] = useState<string>('');
  const socket = useContext(SocketContext);

  const user = useAppSelector(selectUser);

  function sendMessage() {
    if (!value) return;

    socket.emit('new-meeting-message', {
      messageContent: value,
      username: `${user.first_name} ${user.last_name ?? ''}`,
      meetingId,
    });
  }

  useEffect(() => {
    socket.on('new-meeting-message', payload => {
      setMessages(prev => [...prev, payload]);
    });

    return () => {
      socket.off('new-meeting-message');
    };
  }, []);

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
                <span>10:01</span>
              </div>
            </div>
          ))}
          {/* <div className='flex flex-col gap-2 p-4 rounded-md bg-inactive'>
            <p className='text-black font-semibold text-xs'>
              Have you had any exciting adventures or interesting developments recently? I&apos;d
              love to hear about them. Feel free to share any news, stories, or even just your
              thoughts on what&apos;s been keeping you busy. Let&apos;s not let too much time pass
              before we catch up properly. Looking forward to hearing from you and reconnecting!{' '}
            </p>
            <div className='flex justify-between text-xs text-dark-grey'>
              <span>From Jacob Jones</span>
              <span>10:01</span>
            </div>
          </div>
          <div className='flex flex-col gap-2 p-4 rounded-md bg-inactive'>
            <p className='text-black font-semibold text-xs'>
              Have you had any exciting adventures or interesting developments recently? I&apos;d
              love to hear about them. Feel free to share any news, stories, or even just your
              thoughts on what&apos;s been keeping you busy. Let&apos;s not let too much time pass
              before we catch up properly. Looking forward to hearing from you and reconnecting!{' '}
            </p>
            <div className='flex justify-between text-xs text-dark-grey'>
              <span>From Jacob Jones</span>
              <span>10:01</span>
            </div>
          </div>
          <div className='flex flex-col gap-2 p-4 rounded-md bg-inactive'>
            <p className='text-black font-semibold text-xs'>
              Have you had any exciting adventures or interesting developments recently? I&apos;d
              love to hear about them. Feel free to share any news, stories, or even just your
              thoughts on what&apos;s been keeping you busy. Let&apos;s not let too much time pass
              before we catch up properly. Looking forward to hearing from you and reconnecting!{' '}
            </p>
            <div className='flex justify-between text-xs text-dark-grey'>
              <span>From Jacob Jones</span>
              <span>10:01</span>
            </div>
          </div>
          <div className='flex flex-col gap-2 p-4 rounded-md bg-inactive'>
            <p className='text-black font-semibold text-xs'>
              Have you had any exciting adventures or interesting developments recently? I&apos;d
              love to hear about them. Feel free to share any news, stories, or even just your
              thoughts on what&apos;s been keeping you busy. Let&apos;s not let too much time pass
              before we catch up properly. Looking forward to hearing from you and reconnecting!{' '}
            </p>
            <div className='flex justify-between text-xs text-dark-grey'>
              <span>From Jacob Jones</span>
              <span>10:01</span>
            </div>
          </div>
          <div className='flex flex-col gap-2 p-4 rounded-md bg-inactive'>
            <p className='text-black font-semibold text-xs'>
              Have you had any exciting adventures or interesting developments recently? I&apos;d
              love to hear about them. Feel free to share any news, stories, or even just your
              thoughts on what&apos;s been keeping you busy. Let&apos;s not let too much time pass
              before we catch up properly. Looking forward to hearing from you and reconnecting!{' '}
            </p>
            <div className='flex justify-between text-xs text-dark-grey'>
              <span>From Jacob Jones</span>
              <span>10:01</span>
            </div>
          </div>
          <div className='flex flex-col gap-2 p-4 rounded-md bg-inactive'>
            <p className='text-black font-semibold text-xs'>
              Have you had any exciting adventures or interesting developments recently? I&apos;d
              love to hear about them. Feel free to share any news, stories, or even just your
              thoughts on what&apos;s been keeping you busy. Let&apos;s not let too much time pass
              before we catch up properly. Looking forward to hearing from you and reconnecting!{' '}
            </p>
            <div className='flex justify-between text-xs text-dark-grey'>
              <span>From Jacob Jones</span>
              <span>10:01</span>
            </div>
          </div>
          <div className='flex flex-col gap-2 p-4 rounded-md bg-inactive'>
            <p className='text-black font-semibold text-xs'>
              Have you had any exciting adventures or interesting developments recently? I&apos;d
              love to hear about them. Feel free to share any news, stories, or even just your
              thoughts on what&apos;s been keeping you busy. Let&apos;s not let too much time pass
              before we catch up properly. Looking forward to hearing from you and reconnecting!{' '}
            </p>
            <div className='flex justify-between text-xs text-dark-grey'>
              <span>From Jacob Jones</span>
              <span>10:01</span>
            </div>
          </div>
          <div className='flex flex-col gap-2 p-4 rounded-md bg-inactive'>
            <p className='text-black font-semibold text-xs'>
              Have you had any exciting adventures or interesting developments recently? I&apos;d
              love to hear about them. Feel free to share any news, stories, or even just your
              thoughts on what&apos;s been keeping you busy. Let&apos;s not let too much time pass
              before we catch up properly. Looking forward to hearing from you and reconnecting!{' '}
            </p>
            <div className='flex justify-between text-xs text-dark-grey'>
              <span>From Jacob Jones</span>
              <span>10:01</span>
            </div>
          </div> */}
        </div>
      </ScrollArea>
      <input
        type='text'
        placeholder='Message'
        className='md:absolute bottom-2 focus:outline-blue mt-5 md:mt-0 p-4 mx:pr-12 rounded-2xl w-full bg-[#DBDBDB]'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <SendHorizontal
        className='absolute text-blue z-20 bottom-4 md:bottom-6 right-2'
        onClick={sendMessage}
      />
    </div>
  );
}
