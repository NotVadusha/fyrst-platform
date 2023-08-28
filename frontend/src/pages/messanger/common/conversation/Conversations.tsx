import React from 'react';
import { Link, useParams, useRouteError } from 'react-router-dom';
import { useAppSelector } from 'src/hooks/redux';
import { cn } from 'src/lib/utils';
import { useGetAllUserChatsQuery } from 'src/store/reducers/chat/chatApi';

export const Conversations: React.FC = () => {
  const { data } = useGetAllUserChatsQuery('');

  const members = data?.members || [];

  const user = useAppSelector(state => state.user);

  return (
    <div className=''>
      <input
        type='text'
        placeholder='Search'
        className='p-4 rounded-2xl bg-field w-full text-body-default h-14 w-96 opacity-50'
      />
      <div className='mt-8 grid gap-8'>
        {data?.length > 0 ? (
          data?.map((chat: any) => {
            const lastMessage = chat.messages[0];

            const isAuthor = lastMessage?.userId === user.id;
            return (
              <Link to={`/chat/${chat.id}`} key={chat.id}>
                <div className='w-full h-20 bg-white drop-shadow rounded-2xl p-4 grid grid-flow-col gap-6'>
                  <span className='bg-[#DBDBDB] w-12 h-12 rounded-full'></span>
                  {lastMessage ? (
                    <>
                      <div className='w-52 h-12 grid gap-1'>
                        <span
                          className={cn('text-body-default font-semibold text-black leading-6', {
                            'text-blue': isAuthor,
                          })}
                        >
                          {isAuthor && 'You'}
                          {/* {`${lastMessage.user.first_name} ${lastMessage.user.last_name}` : 'Unknown Member'} */}
                        </span>
                        <p className='text-dark-grey text-body-small font-normal leading-5 whitespace-nowrap overflow-hidden overflow-ellipsis'>
                          {/* {lastMessage.messageContent} */}
                          Something cool
                        </p>
                      </div>
                      <span className='text-body-small text-dark-grey opacity-80 font-normal leading-5 flex items-center text-center'>
                        {/* {message.time} */}
                        12:31
                      </span>
                    </>
                  ) : (
                    <div className='w-52 h-12 flex flex-col text-dark-grey'>
                      <span className='font-bold text-black text-xl self-start'>
                        {chat.name}
                      </span>
                      <span>No messages yet.</span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })
        ) : (
          <p>No messages found.</p>
        )}
      </div>
    </div>
  );
};
