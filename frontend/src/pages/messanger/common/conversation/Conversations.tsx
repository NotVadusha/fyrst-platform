import React from 'react';
import { Link } from 'react-router-dom';

const mockMessages = [
  {
    name: 'Camil Goal',
    id: 1,
    text: 'I’ll meet you tomorrow, and we will...',
    time: '15:02',
  },
  {
    name: 'Brooklyn Simmons',
    id: 2,
    text: 'Great, looking forward to it!',
    time: '14:50',
  },
  {
    name: 'Guy Hawkins',
    id: 3,
    text: 'I am a driver with 5 years experienc...',
    time: '12:12',
  },
  {
    name: 'Jacob Jones',
    id: 4,
    text: 'Okay',
    time: '11:47',
  },
  {
    name: 'Bessie Cooper',
    id: 5,
    text: 'Busy right now, call you later',
    time: '11:15',
  },
];

export const Conversations: React.FC = () => {
  return (
    <div className=''>
      <input
        type='text'
        placeholder='Search'
        className='p-4 rounded-2xl bg-field w-full text-body-default h-14 w-96 opacity-50'
      />
      <div className='mt-8 grid gap-8'>
        {mockMessages.map(message => (
          <Link to={`/chat/${message.id}`} key={message.id}>
            <div className='w-full h-20 bg-white drop-shadow rounded-2xl p-4 grid grid-flow-col gap-6'>
              <span className='bg-[#DBDBDB] w-12 h-12 rounded-full'></span>
              <div className='w-52 h-12 grid gap-1'>
                <span className='text-body-default font-semibold text-black leading-6'>
                  {message.name}
                </span>
                <p className='text-dark-grey text-body-small font-normal leading-5 whitespace-nowrap overflow-hidden overflow-ellipsis'>
                  {message.text}
                </p>
              </div>
              <span className='text-body-small text-dark-grey opacity-80 font-normal leading-5 flex items-center text-center'>
                {message.time}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
