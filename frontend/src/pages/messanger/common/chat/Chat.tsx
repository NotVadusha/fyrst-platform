import React from 'react';
import { useParams } from 'react-router-dom';
import { ReactComponent as SearchLoupe } from 'src/icons/search-loupe.svg';
import { useGetAllMessagesQuery } from 'src/store/services/chat.service';

const mockMessages = [
  {
    id: 1,
    text: 'Nice to meet you. I’d like to apply to this job.',
    time: '09:40',
  },
  {
    id: 2,
    text: 'Great! Can you tell me more about yourself?',
    time: '10:01',
  },
  {
    id: 4,
    text: 'I am a driver with 5 years of experience. Now I am available for at least three weeks.',
    time: '12:12',
  },
];

export const ChatPage: React.FC = () => {
  const { chatId } = useParams();

  if (!chatId) return <>No Chat with this Id was found</>;

  const { data } = useGetAllMessagesQuery({ chatId });

  return (
    <>
      <div className='flex items-center justify-between mb-8'>
        <div className='grid gap-2'>
          <p className='text-2xl/[24px] font-semibold text-black'>Guy Hawkins</p>
          <span className='text-dark-grey text-sm/[14px] font-medium'>online</span>
        </div>
        <SearchLoupe />
      </div>
      <div className='text-center text-dark-grey text-sm font-medium'>Today</div>
      <div className='mt-4'>
        {mockMessages.map(message => (
          <>
            <div
              key={message.id}
              className='inline-flex flex flex-col max-w-md mx-3 my-4 p-2 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl bg-inactive'
            >
              <p className='text-black text-sm font-medium'>{message.text}</p>
              <span className='text-dark-grey text-body-small font-medium text-end text-sm'>
                {message.time}
              </span>
            </div>
          </>
        ))}
      </div>
      <div className='mt-36'>
        <input type='text' placeholder='Message' className='w-full p-4 rounded-2xl bg-[#DBDBDB]' />
      </div>
    </>
  );
};
