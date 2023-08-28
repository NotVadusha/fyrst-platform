import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetAllMessagesQuery } from 'src/store/services/chat.service';

export const Conversations: React.FC = () => {
  const { chatId } = useParams();

  if (!chatId) return <>Chat not found</>;

  const { data } = useGetAllMessagesQuery({ chatId });

  return (
    <>
      <input
        type='text'
        placeholder='Search'
        className='p-4 rounded-2xl bg-field w-full text-body-default h-14 w-96 opacity-50'
      />
      <div className='mt-8 grid gap-8'>
        {data?.messages ? (
          data?.messages.map(message => (
            <Link to={`/chat/${message.id}`} key={message.id}>
              <div className='w-full h-20 bg-white drop-shadow rounded-2xl p-4 grid grid-flow-col gap-6'>
                <span className='bg-[#DBDBDB] w-12 h-12 rounded-full'></span>
                <div className='w-52 h-12 grid gap-1'>
                  <p className='text-dark-grey text-body-small font-normal leading-5 whitespace-nowrap overflow-hidden overflow-ellipsis'>
                    {message.messageContent}
                  </p>
                </div>
                <span className='text-body-small text-dark-grey opacity-80 font-normal leading-5 flex items-center text-center'>
                  {message.time}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p>No messages found.</p>
        )}
      </div>
    </>
  );
};
