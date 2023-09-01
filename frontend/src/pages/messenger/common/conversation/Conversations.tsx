import { format } from 'date-fns';
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ScrollArea } from 'src/common/components/ui/common/ScrollArea/ScrollArea';
import { useAppDispatch, useAppSelector } from 'src/common/hooks/redux';
import { socket } from 'src/common/config/packages/socket/socket.config';
import { cn } from 'src/common/helpers/helpers';
import {
  addConversation,
  setConversations,
  updateConversation,
} from 'src/common/store/slices/packages/messenger/messangerSlice';
import {
  useGetAllUserChatsQuery,
  useSearchChatsQuery,
} from 'src/common/store/api/packages/chat/chatApi';
import { SearchInput } from './common/SearchInput';
import { useDebounce } from 'src/common/hooks/use-debounce/useDebounce.hook';
import { Chat } from 'shared/socketEvents';
import { Avatar, AvatarFallback, AvatarImage } from 'src/common/components/ui/common/Avatar/Avatar';

export const Conversations: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { data: allChats } = useGetAllUserChatsQuery('');
  const { data: searchedChats } = useSearchChatsQuery(searchQuery);

  const conversations = useAppSelector(state => state.messanger.conversations);

  const chatsToShow = debouncedSearchQuery ? searchedChats : conversations;

  const user = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on('send-conversations', conversations => {
      dispatch(setConversations(conversations));
    });

    socket.on('conversation-update', data => {
      dispatch(updateConversation(data));
    });

    socket.on('new-conversation', conversation => {
      dispatch(addConversation(conversation));
    });

    if (!user?.id) return;

    socket.emit('get-conversations', { userId: user?.id });

    return () => {
      socket.off('send-conversations');
      socket.off('conversation-update');
      socket.off('new-conversation');
      // socket.disconnect();
    };
  }, [user.id]);

  const handleChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  return (
    <div className='relative'>
      <SearchInput value={searchQuery} onChange={handleChange} />
      <ScrollArea className='h-[120px] xl:h-[400px] w-full p-2'>
        <div className='grid gap-4'>
          {chatsToShow?.length > 0 ? (
            chatsToShow?.map((chat: Chat) => {
              return <ConversationLink chat={chat} key={chat.id} />;
            })
          ) : (
            <p>No conversations found.</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

function ConversationLink({ chat }: { chat: Chat }) {
  const user = useAppSelector(state => state.user);

  const lastMessage = chat.messages ? chat.messages[0] : null;

  const location = useLocation();

  const isOnPage = location.pathname.endsWith(String(chat.id));

  const otherMember = chat.members?.find(member => member.id !== user.id);

  const isAuthor = lastMessage?.userId === user.id;
  return (
    <Link to={`/chat/${chat.id}`} key={chat.id}>
      <div
        className={cn(
          'w-full bg-white drop-shadow hover:bg-grey rounded-2xl p-4 flex justify-between gap-6 xl:w-[300px]',
          {
            'bg-grey': isOnPage,
          },
        )}
      >
        <div className='flex gap-4 truncate'>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>
              {otherMember.first_name?.[0]}
              {otherMember.last_name?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <span className={cn('text-body-default font-semibold text-black leading-6')}>
              {otherMember?.first_name} {otherMember?.last_name ?? ''}
            </span>
            {lastMessage ? (
              <p className='text-dark-grey text-body-small font-normal leading-5 flex gap-1 whitespace-nowrap overflow-hidden'>
                <span
                  className={cn({
                    'text-blue': isAuthor,
                  })}
                >
                  {isAuthor
                    ? 'You,'
                    : `${otherMember?.first_name} ${otherMember?.last_name ?? ''},`}
                </span>
                {lastMessage && lastMessage.messageContent}
              </p>
            ) : (
              <span className='text-dark-grey'>No messages yet.</span>
            )}
          </div>
        </div>
        <span className='text-body-small text-dark-grey opacity-80 font-normal leading-5 flex items-center text-center self-center'>
          {lastMessage?.createdAt && format(new Date(lastMessage?.createdAt), 'HH:mm')}
        </span>
      </div>
    </Link>
  );
}
