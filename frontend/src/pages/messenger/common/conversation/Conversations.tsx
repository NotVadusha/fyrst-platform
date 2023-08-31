import { format } from 'date-fns';
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ScrollArea } from 'src/common/components/ui/common/ScrollArea/ScrollArea';
import { useAppDispatch, useAppSelector } from 'src/common/hooks/redux';
import { socket } from 'src/common/config/packages/socket/socket.config';
import { cn } from 'src/common/helpers/helpers';
import {
  setConversations,
  upsertConversation,
} from 'src/common/store/slices/packages/messenger/messangerSlice';
import {
  useGetAllUserChatsQuery,
  useSearchChatsQuery,
} from 'src/common/store/api/packages/chat/chatApi';
import { SearchInput } from './common/SearchInput';
import { useDebounce } from 'src/common/hooks/use-debounce/useDebounce.hook';

export const Conversations: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { data: allChats } = useGetAllUserChatsQuery('');
  const { data: searchedChats } = useSearchChatsQuery(searchQuery);

  const chatsToShow = debouncedSearchQuery ? searchedChats : allChats;

  // const [conversations, setConversations] = useState<Omit<Chat, 'members'>[]>([]);

  const user = useAppSelector(state => state.user);

  const conversations = useAppSelector(state => state.messanger.conversations);
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on('send-conversations', conversations => {
      console.log(conversations);
      dispatch(setConversations(conversations));
    });

    socket.on('conversation-upsert', conversation => {
      console.log(conversation);
      dispatch(upsertConversation(conversation));
    });

    if (!user?.id) return;

    socket.emit('get-conversations', { userId: user?.id });

    return () => {
      // socket.disconnect();
    };
  }, [user.id]);

  const handleChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  return (
    <div className='relative  lg:min-w-[260px]'>
      <SearchInput value={searchQuery} onChange={handleChange} />
      <ScrollArea className=' h-[120px] xl:h-[400px] w-full p-2'>
        <div className='grid gap-4'>
          {chatsToShow?.length > 0 ? (
            chatsToShow?.map((chat: any) => {
              const lastMessage = chat.messages ? chat.messages[0] : null;

              const isAuthor = lastMessage?.userId === user.id;

              const isOnPage = location.pathname.endsWith(String(chat.id));

              return (
                <Link to={`/chat/${chat.id}`} key={chat.id}>
                  <div
                    className={cn(
                      'w-full bg-white drop-shadow hover:bg-grey rounded-2xl p-4 flex gap-6',
                      { 'bg-grey': isOnPage },
                    )}
                  >
                    <span className='bg-[#DBDBDB] w-12 h-12 rounded-full'></span>
                    {lastMessage ? (
                      <>
                        <div className='grid gap-1'>
                          <span
                            className={cn('text-body-default font-semibold text-black leading-6', {
                              'text-blue': isAuthor,
                            })}
                          >
                            {lastMessage && isAuthor && 'You, '}
                            {!isAuthor &&
                              lastMessage &&
                              `${lastMessage.user.first_name} ${lastMessage.user.last_name}`}
                          </span>
                          <p className='text-dark-grey text-body-small font-normal leading-5 whitespace-nowrap overflow-hidden overflow-ellipsis'>
                            {lastMessage && lastMessage.messageContent}
                          </p>
                        </div>
                        <span className='text-body-small text-dark-grey opacity-80 font-normal leading-5 flex items-center text-center self-end'>
                          {lastMessage?.createdAt &&
                            format(new Date(lastMessage?.createdAt), 'HH:mm')}
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
