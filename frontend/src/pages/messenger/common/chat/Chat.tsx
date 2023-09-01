import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReactComponent as SearchLoupe } from 'src/assets/icons/search-loupe.svg';
import { NewMessageInput } from './NewMessageInput';
import { useAppDispatch, useAppSelector } from 'src/common/hooks/redux';
import { socket } from 'src/common/config/packages/socket/socket.config';
import { Chat, Message } from 'shared/socketEvents';
import { format } from 'date-fns';
import { cn } from 'src/common/helpers/helpers';
import { UserDefaultResponse } from 'src/common/packages/user/types/dto/UserDto';
import {
  addMessage,
  setCurrentChat,
  setMessages,
  setOnlineUsers,
} from 'src/common/store/slices/packages/messenger/messangerSlice';
import { Avatar, AvatarFallback, AvatarImage } from 'src/common/components/ui/common/Avatar/Avatar';

export const ChatPage: React.FC = () => {
  const { chatId } = useParams();

  if (!chatId) return <>Chat not found</>;

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const user = useAppSelector(state => state.user);

  // const { data } = useGetChatByIdQuery(chatId);

  const dispatch = useAppDispatch();
  const chat = useAppSelector(state => state.messanger.currentChat);
  const messages = useAppSelector(state => state.messanger.messages);

  const otherMembers = chat?.members.filter(({ id }) => id !== user?.id);

  const scrollToLastMessage = React.useCallback(() => {
    if (!scrollAreaRef?.current || !lastMessageRef.current) return;
    scrollAreaRef.current.scrollTo({
      top: lastMessageRef.current.offsetTop,
      behavior: 'smooth',
    });
  }, [scrollAreaRef, lastMessageRef]);

  useEffect(() => {
    socket.on('chat-joined', ({ chat, onlineUsers }) => {
      dispatch(setCurrentChat(chat));
      dispatch(setMessages(chat.messages));
      dispatch(setOnlineUsers(onlineUsers));
    });

    socket.emit('user-join-chat', { chatId });

    socket.on('new-message', message => {
      dispatch(addMessage(message));
      scrollToLastMessage();
    });

    return () => {
      socket.off('new-message');
      socket.off('chat-joined');
      socket.emit('user-leave-chat', { chatId });
    };
  }, [chatId]);

  useEffect(() => {
    scrollToLastMessage();
  }, [chatId, lastMessageRef?.current]);

  return (
    <div className='relative w-full flex-1 lg:min-w-[500px]'>
      <div className='flex items-center justify-between mb-8 W-full'>
        <div className='grid gap-2'>
          <p className='text-2xl/[24px] font-semibold text-black'>
            {otherMembers
              ?.map(
                ({ first_name, last_name }: UserDefaultResponse) =>
                  `${first_name} ${last_name ?? ''}`,
              )
              .join(', ')}
          </p>
        </div>
        <SearchLoupe />
      </div>
      <div
        className='h-[320px] mb-16 py-2 overflow-y-auto truncate scrollbar-w-2 scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-thumb-rounded'
        ref={scrollAreaRef}
      >
        <div className='text-center text-dark-grey text-sm font-medium'>Today</div>
        <div className='mt-4 flex flex-col w-full pr-4'>
          {messages?.map((message: Message, index) => {
            const isAuthor = message.userId === user.id;
            const hasNextMessage = messages[index + 1]?.userId === message.userId;

            if (messages.length - 1 === index) {
              return (
                <div ref={lastMessageRef} key={message.id} className={cn({ 'self-end': isAuthor })}>
                  <MessageElement message={message} hasNextMessage={hasNextMessage} />
                </div>
              );
            }

            return (
              <MessageElement key={message.id} message={message} hasNextMessage={hasNextMessage} />
            );
          })}
        </div>
      </div>
      <div className='absolute bottom-0 z-10 w-full'>
        <NewMessageInput chatId={chatId} />
      </div>
    </div>
  );
};

const MessageElement = ({
  message,
  hasNextMessage,
}: {
  message: Message;
  hasNextMessage?: boolean;
}) => {
  const user = useAppSelector(state => state.user);
  const onlineUsers = useAppSelector(state => state.messanger.onlineUsers);

  const isOnline = onlineUsers.includes(message.userId);

  console.log(onlineUsers, message.userId);

  const isAuthor = user.id === message.userId;

  const fallback = `${message.user?.first_name?.[0]}${message.user?.last_name?.[0]}` || '';

  return (
    <div className={cn('flex gap-2 self-start', { 'self-end': isAuthor })}>
      {!isAuthor && (
        <UserAvatar
          className={cn('w-8 h-8 self-end', { invisible: hasNextMessage })}
          isOnline={isOnline}
          fallback={fallback}
        />
      )}
      <div
        className={cn(
          'inline-flex flex flex-col max-w-md mx-3 my-4 p-2 rounded-tr-2xl rounded-tl-2xl bg-inactive',
          { 'rounded-bl-2xl': isAuthor, 'rounded-br-2xl': !isAuthor },
        )}
      >
        <p className='text-black text-sm font-medium'>{message.messageContent}</p>
        <span className='text-dark-grey text-body-small font-medium text-end text-sm'>
          {message.createdAt && format(new Date(message.createdAt), 'HH:mm')}
        </span>
      </div>
      {!!isAuthor && (
        <UserAvatar
          className={cn('w-8 h-8 self-end', { invisible: hasNextMessage })}
          isOnline={isOnline}
          fallback={fallback}
        />
      )}
    </div>
  );
};

function UserAvatar({
  isOnline,
  className,
  fallback,
}: {
  isOnline: boolean;
  className?: string;
  fallback: string;
}) {
  return (
    <Avatar className={cn('relative overflow-visible', className)}>
      <AvatarImage src='https://github.com/shadcn.png' className='rounded-full' />
      <AvatarFallback>{fallback}</AvatarFallback>
      <span
        className={cn('absolute right-0 bottom-0 w-3 h-3 border border-black rounded-full', {
          'bg-[#22c55e]': isOnline,
          'bg-grey': !isOnline,
        })}
      ></span>
    </Avatar>
  );
}
