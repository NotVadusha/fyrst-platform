import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ReactComponent as SearchLoupe } from 'src/icons/search-loupe.svg';
import { useGetAllMessagesQuery } from 'src/store/reducers/chat/chatApi';
import { NewMessageInput } from './NewMessageInput';
import { useAppSelector } from 'src/hooks/redux';
import { socket } from 'src/lib/socket';
import { format } from 'date-fns';

const mockMessages = [
  {
    id: 1,
    text: 'Nice to meet you. I’d like to apply to this job.',
    time: '09:40',
    user: {
      id: 1,
      name: 'Gamil Goal',
      imageUrl: '',
    },
  },
  {
    id: 2,
    text: 'Great! Can you tell me more about yourself?',
    time: '10:01',
    user: {
      id: 2,
      name: 'Gamil Goal',
      imageUrl: '',
    },
  },
  {
    id: 4,
    text: 'I am a driver with 5 years of experience. Now I am available for at least three weeks.',
    time: '12:12',
    user: {
      id: 1,
      name: 'Gamil Goal',
      imageUrl: '',
    },
  },
];

export const ChatPage: React.FC = () => {
  const { chatId } = useParams();

  const userId = 1;

  if (!chatId) return <>No Chat with this Id was found</>;

  const { data } = useGetAllMessagesQuery({ chatId });

  const user = useAppSelector(state => state.user);

  const otherMembers = data?.members.filter(({ id }) => id !== user?.id);

  useEffect(() => {
    socket.on('onCreate', message => {
      console.log(message);
    });
  }, []);

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-8 W-full'>
        <div className='grid gap-2'>
          <p className='text-2xl/[24px] font-semibold text-black'>
            {otherMembers
              ?.map(({ first_name, last_name }: any) => `${first_name} ${last_name}`)
              .join(', ')}
          </p>
          <span className='text-dark-grey text-sm/[14px] font-medium'>online</span>
        </div>
        <SearchLoupe />
      </div>
      <div className='text-center text-dark-grey text-sm font-medium'>Today</div>
      <div className='mt-4 flex flex-col w-full'>
        {data?.messages.map((message: any) => {
          if (message.userId === userId) {
            return (
              <div className='flex gap-2 self-end' key={message?.id}>
                <div className='inline-flex flex flex-col max-w-md mx-3 my-4 p-2 rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl bg-inactive'>
                  <p className='text-black text-sm font-medium'>{message.messageContent}</p>
                  <span className='text-dark-grey text-body-small font-medium text-end text-sm'>
                    {format(new Date(message?.createdAt), 'HH:mm')}
                  </span>
                </div>
                <div className='bg-grey w-8 h-8 rounded-full self-end' />
              </div>
            );
          }

          return (
            <div className='flex gap-2 self-start' key={message?.id}>
              <div className='bg-grey w-8 h-8 rounded-full self-end' />

              <div className='inline-flex flex flex-col max-w-md mx-3 my-4 p-2 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl bg-inactive'>
                <p className='text-black text-sm font-medium'>{message.messageContent}</p>
                <span className='text-dark-grey text-body-small font-medium text-end text-sm'>
                  {format(new Date(message?.createdAt), 'HH:mm')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className='mt-36'>
        <NewMessageInput chatId={chatId} />
      </div>
    </div>
  );
};
