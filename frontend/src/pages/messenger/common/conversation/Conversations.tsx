import { format } from 'date-fns';
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ScrollArea } from 'src/common/components/ui/common/ScrollArea/ScrollArea';
import { useAppDispatch, useAppSelector } from 'src/common/hooks/redux';
import { cn } from 'src/common/helpers/helpers';
import { SearchInput } from './common/SearchInput';
import { useDebounce } from 'src/common/hooks/use-debounce/useDebounce.hook';
import { Chat } from 'shared/socketEvents';
import { Avatar, AvatarFallback, AvatarImage } from 'src/common/components/ui/common/Avatar/Avatar';
import { getConversationsByUserNames } from 'src/common/store/slices/packages/messenger/messangerSlice';

export const Conversations = ({ onSelect }: { onSelect?: () => void }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const searchedChats = useAppSelector(state =>
    getConversationsByUserNames(state, debouncedSearchQuery.split(' ')),
  );

  const conversations = useAppSelector(state => state.messanger.conversations);

  const chatsToShow = debouncedSearchQuery ? searchedChats : conversations;

  const handleChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  return (
    <div className='relative'>
      <SearchInput value={searchQuery} onChange={handleChange} />
      <ScrollArea className='h-[400px] w-full p-2'>
        <div className='grid gap-4'>
          {chatsToShow?.length > 0 ? (
            chatsToShow?.map((chat: Chat) => {
              if (chat.members.length > 2) {
                return <GroupChatLink chat={chat} key={chat.id} onSelect={onSelect} />;
              }
              return <ConversationLink chat={chat} key={chat.id} onSelect={onSelect} />;
            })
          ) : (
            <div className='flex items-center gap-2 xl:w-[300px]'>Nothing matches your search.</div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

function ConversationLink({ chat, onSelect }: { chat: Chat; onSelect?: () => void }) {
  const user = useAppSelector(state => state.user);

  const lastMessage = chat.messages ? chat.messages[0] : null;

  const location = useLocation();

  const isOnPage = location.pathname.includes(String(chat.id));

  const otherMember = chat.members?.find(member => member.id !== user.id);

  const isAuthor = lastMessage?.userId === user.id;

  console.log(otherMember);

  return (
    <Link
      to={`/chat/${chat.id}`}
      key={chat.id}
      onClick={() => {
        console.log('here');
        onSelect?.();
      }}
    >
      <div
        className={cn(
          'w-full bg-white drop-shadow hover:bg-grey rounded-2xl p-4 flex justify-between gap-6 truncate xl:w-[300px]',
          {
            'bg-grey': isOnPage,
          },
        )}
      >
        <div className='flex gap-4 truncate'>
          <Avatar>
            <AvatarImage src={otherMember?.profile?.avatar} />
            <AvatarFallback>
              {otherMember.first_name?.[0]}
              {otherMember.last_name?.[0] ?? ''}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col max-w-[200px]'>
            <span className={cn('text-body-default font-semibold text-black leading-6 truncate')}>
              {otherMember?.first_name} {otherMember?.last_name ?? ''}
            </span>
            {lastMessage ? (
              <p className='truncate text-dark-grey text-body-small font-normal leading-5 flex gap-1 whitespace-nowrap overflow-hidden'>
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

function GroupChatLink({ chat, onSelect }: { chat: Chat; onSelect?: () => void }) {
  const user = useAppSelector(state => state.user);

  const lastMessage = chat.messages ? chat.messages[0] : null;

  const location = useLocation();

  const isOnPage = location.pathname.endsWith(String(chat.id));

  const otherMembers = chat.members?.filter(member => member.id !== user.id);

  const isAuthor = lastMessage?.userId === user.id;
  return (
    <Link to={`/chat/${chat.id}`} key={chat.id} onClick={() => onSelect?.()}>
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
            <AvatarImage
            //   src={message.user.profile.avatar}
            />
            <AvatarFallback>
              {otherMembers?.[0].first_name?.[0]}
              {otherMembers?.[0].last_name?.[0] ?? ''}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col max-w-[200px]'>
            <span className={cn('text-body-default font-semibold text-black leading-6 truncate')}>
              {otherMembers.map(m => `${m.first_name} ${m.last_name ?? ''}`).join(', ')}
            </span>
            {lastMessage ? (
              <p className='truncate text-dark-grey text-body-small font-normal leading-5 flex gap-1 whitespace-nowrap overflow-hidden'>
                <span
                  className={cn({
                    'text-blue': isAuthor,
                  })}
                >
                  {isAuthor
                    ? 'You,'
                    : `${lastMessage.user?.first_name} ${lastMessage?.user.last_name ?? ''},`}
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
