import { format } from 'date-fns';
import React from 'react';
import { Link, useParams, useRouteError } from 'react-router-dom';
import { ScrollArea } from 'src/components/ui/common/ScrollArea/ScrollArea';
import { useAppSelector } from 'src/hooks/redux';
import { cn } from 'src/lib/utils';
import { useGetAllUserChatsQuery } from 'src/store/reducers/chat/chatApi';

export const Conversations: React.FC = () => {
  const { data } = useGetAllUserChatsQuery('');

  const members = data?.members || [];

  const user = useAppSelector(state => state.user);

  return (
    <div className='relative min-w-[260px]'>
      <input
        type='text'
        placeholder='Search'
        className='absolute top-0 left-0 z-10 p-4 rounded-2xl bg-field text-body-default w-full opacity-50'
      />
      <ScrollArea className='mt-16 h-[120px] xl:h-[400px] w-full p-2'>
        <div className='grid gap-4'>
          {data?.length > 0 ? (
            data?.map((chat: any) => {
              const lastMessage = chat.messages[0];

              const isAuthor = lastMessage?.userId === user.id;
              return (
                <Link to={`/chat/${chat.id}`} key={chat.id}>
                  <div className='w-full bg-white drop-shadow hover:bg-grey rounded-2xl p-4 flex gap-6'>
                    <span className='bg-[#DBDBDB] w-12 h-12 rounded-full'></span>
                    {lastMessage ? (
                      <>
                        <div className='grid gap-1'>
                          <span
                            className={cn('text-body-default font-semibold text-black leading-6', {
                              'text-blue': isAuthor,
                            })}
                          >
                            {isAuthor && 'You'}
                            {lastMessage &&
                              `${lastMessage.user.first_name} ${lastMessage.user.last_name}`}
                          </span>
                          <p className='text-dark-grey text-body-small font-normal leading-5 whitespace-nowrap overflow-hidden overflow-ellipsis'>
                            {lastMessage && lastMessage.messageContent}
                          </p>
                        </div>
                        <span className='text-body-small text-dark-grey opacity-80 font-normal leading-5 flex items-center text-center self-end'>
                          {/* {message.time} */}
                          {format(new Date(lastMessage?.createdAt), 'HH:mm')}
                        </span>
                      </>
                    ) : (
                      <div className='flex flex-col text-dark-grey'>
                        <span className='font-bold text-black text-xl self-start'>{chat.name}</span>
                        <span>No messages yet.</span>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })
          ) : (
            <p>No conversations found.</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
