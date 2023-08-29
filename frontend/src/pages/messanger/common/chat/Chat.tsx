import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ReactComponent as SearchLoupe } from 'src/icons/search-loupe.svg';
import { useGetChatByIdQuery } from 'src/store/reducers/chat/chatApi';
import { NewMessageInput } from './NewMessageInput';
import { useAppSelector } from 'src/hooks/redux';
import { socket } from 'src/lib/socket';
import { Message } from 'shared/socketEvents';
import { format } from 'date-fns';
import { ScrollArea } from 'src/components/ui/common/ScrollArea/ScrollArea';
import { cn } from 'src/lib/utils';
import { UserDefaultResponse } from 'types/dto/UserDto';

export const ChatPage: React.FC = () => {
  const { chatId } = useParams();

  const userId = 1;

  if (!chatId) return <>Chat not found</>;

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  const user = useAppSelector(state => state.user);

  const { data } = useGetChatByIdQuery(chatId);

  const otherMembers = data?.members.filter(({ id }) => id !== user?.id);

  useEffect(() => {
    setMessages(data?.messages ?? []);
  }, [data?.messages]);

  const scrollToLastMessage = React.useCallback(() => {
    if (!scrollAreaRef?.current || !lastMessageRef.current) return;
    console.log(scrollAreaRef, lastMessageRef);
    scrollAreaRef.current.scrollTo({
      top: lastMessageRef.current.offsetTop,
      behavior: 'smooth',
    });
  }, [scrollAreaRef, lastMessageRef]);

  useEffect(() => {
    socket.emit('user-join-chat', { chatId });

    socket.on('onCreate', message => {
      console.log(message);
      setMessages(prev => [...prev, message]);
      console.log(scrollAreaRef, lastMessageRef);
      scrollToLastMessage();
    });
  }, []);

  return (
    <div className='relative w-full flex-1 min-w-[500px]'>
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
      <ScrollArea className='h-[320px] mb-16 py-2' ref={scrollAreaRef}>
        <div className='text-center text-dark-grey text-sm font-medium'>Today</div>
        <div className='mt-4 flex flex-col w-full'>
          {messages?.map((message: any, index) => {
            if (messages.length - 1 === index) {
              return (
                <div ref={lastMessageRef} key={message.id}>
                  <MessageElement
                    messageContent={message.messageContent}
                    createdAt={message.createdAt}
                    isAuthor={message.userId === userId}
                  />
                </div>
              );
            }

            return (
              <MessageElement
                messageContent={message.messageContent}
                createdAt={message.createdAt}
                isAuthor={message.userId === userId}
                key={message.id}
              />
            );
          })}
        </div>
      </ScrollArea>
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
}: {
  isAuthor: boolean;
  messageContent: string;
  createdAt: Date;
}) => {
  return (
    <div className={cn('flex gap-2 self-start', { 'self-end': isAuthor })}>
      {!isAuthor && <div className='bg-grey w-8 h-8 rounded-full self-end' />}
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
      {!!isAuthor && <div className='bg-grey w-8 h-8 rounded-full self-end' />}
    </div>
  );
};
