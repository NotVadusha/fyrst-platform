import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReactComponent as SearchLoupe } from 'src/icons/search-loupe.svg';
import { NewMessageInput } from './NewMessageInput';
import { useAppSelector } from 'src/common/hooks/redux';
import { socket } from 'src/lib/socket';
import { Chat, Message } from 'shared/socketEvents';
import { format } from 'date-fns';
import { cn } from 'src/common/helpers/helpers';
import { UserDefaultResponse } from 'src/common/packages/user/types/dto/UserDto';

export const ChatPage: React.FC = () => {
  const { chatId } = useParams();

  if (!chatId) return <>Chat not found</>;

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const [chat, setChat] = useState<Chat>();
  const [messages, setMessages] = useState<Message[]>([]);

  const user = useAppSelector(state => state.user);

  // const { data } = useGetChatByIdQuery(chatId);

  const otherMembers = chat?.members.filter(({ id }) => id !== user?.id);

  const scrollToLastMessage = React.useCallback(() => {
    if (!scrollAreaRef?.current || !lastMessageRef.current) return;
    scrollAreaRef.current.scrollTo({
      top: lastMessageRef.current.offsetTop,
      behavior: 'smooth',
    });
  }, [scrollAreaRef, lastMessageRef]);

  useEffect(() => {
    socket.on('chat-joined', chat => {
      setChat(chat);
      setMessages(chat.messages);
    });

    socket.emit('user-join-chat', { chatId });

    socket.on('new-message', message => {
      setMessages(prev => [...prev, message]);
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
  }, [chatId, lastMessageRef]);

  return (
    <div className='relative w-full flex-1 lg:min-w-[500px]'>
      <div className='flex items-center justify-between mb-8 W-full'>
        <div className='grid gap-2'>
          <p className='text-2xl/[24px] font-semibold text-black'>
            {otherMembers
              ?.map(
                ({ first_name, last_name }: UserDefaultResponse) => `${first_name} ${last_name}`,
              )
              .join(', ')}
          </p>
          <span className='text-dark-grey text-sm/[14px] font-medium'>online</span>
        </div>
        <SearchLoupe />
      </div>
      <div
        className='h-[320px] mb-16 py-2 overflow-auto scrollbar-w-2 scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-thumb-rounded'
        ref={scrollAreaRef}
      >
        <div className='text-center text-dark-grey text-sm font-medium'>Today</div>
        <div className='mt-4 flex flex-col w-full pr-4'>
          {messages?.map((message: any, index) => {
            const isAuthor = message.userId === user.id;
            const hasNextMessage = messages[index + 1]?.userId === message.userId;
            if (messages.length - 1 === index) {
              return (
                <div ref={lastMessageRef} key={message.id} className={cn({ 'self-end': isAuthor })}>
                  <MessageElement
                    messageContent={message.messageContent}
                    createdAt={message.createdAt}
                    isAuthor={isAuthor}
                    hasNextMessage={hasNextMessage}
                  />
                </div>
              );
            }

            return (
              <MessageElement
                messageContent={message.messageContent}
                createdAt={message.createdAt}
                isAuthor={isAuthor}
                key={message.id}
                hasNextMessage={hasNextMessage}
              />
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
  isAuthor,
  messageContent,
  createdAt,
  hasNextMessage,
}: {
  isAuthor: boolean;
  messageContent: string;
  createdAt: Date;
  hasNextMessage: boolean;
}) => {
  return (
    <div className={cn('flex gap-2 self-start', { 'self-end': isAuthor })}>
      {!isAuthor && (
        <div
          className={cn('bg-grey w-8 h-8 rounded-full self-end', { invisible: hasNextMessage })}
        />
      )}
      <div
        className={cn(
          'inline-flex flex flex-col max-w-md mx-3 my-4 p-2 rounded-tr-2xl rounded-tl-2xl bg-inactive',
          { 'rounded-bl-2xl': isAuthor, 'rounded-br-2xl': !isAuthor },
        )}
      >
        <p className='text-black text-sm font-medium'>{messageContent}</p>
        <span className='text-dark-grey text-body-small font-medium text-end text-sm'>
          {format(new Date(createdAt), 'HH:mm')}
        </span>
      </div>
      {!!isAuthor && (
        <div
          className={cn('bg-grey w-8 h-8 rounded-full self-end', { invisible: hasNextMessage })}
        />
      )}
    </div>
  );
};
