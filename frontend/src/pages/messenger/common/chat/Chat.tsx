import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as SearchLoupe } from 'src/assets/icons/search-loupe.svg';
import { ReactComponent as Media } from 'src/assets/icons/media.svg';
import { NewMessageInput } from './NewMessageInput';
import { useAppDispatch, useAppSelector } from 'src/common/hooks/redux';
import { SocketContext } from 'src/common/config/packages/socket/socket.config';
import { Message } from 'shared/socketEvents';
import { format } from 'date-fns';
import { cn } from 'src/common/helpers/helpers';
import { User } from 'src/common/packages/user/types/models/User.model';
import {
  addMessage,
  setCurrentChat,
  setMessages,
  setOnlineUsers,
} from 'src/common/store/slices/packages/messenger/messangerSlice';
import { Avatar, AvatarFallback, AvatarImage } from 'src/common/components/ui/common/Avatar/Avatar';
import { buttonVariants } from 'src/common/components/ui/common/Button/Button';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';

export const ChatPage: React.FC = () => {
  const { chatId } = useParams();

  if (!chatId) return <>Chat not found</>;

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const user = useAppSelector(state => state.user);

  // const { data } = useGetChatByIdQuery(chatId);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const socket = useContext(SocketContext);

  const dispatch = useAppDispatch();
  const chat = useAppSelector(state => state.messanger.currentChat);
  const messages = useAppSelector(state => state.messanger.messages);

  const otherMembers = chat?.members.filter(({ id }) => id !== user?.id);

  const attachmentFile = useAppSelector(state => state.messanger.attachmentFile);

  const imageUrl = React.useMemo(() => {
    if (!attachmentFile) return null;
    return URL.createObjectURL(attachmentFile);
  }, []);

  const scrollToLastMessage = React.useCallback(
    ({ behavior }: { behavior?: ScrollBehavior }) => {
      if (!scrollAreaRef?.current || !lastMessageRef.current) return;
      scrollAreaRef.current.scrollTo({
        top: lastMessageRef.current.offsetTop,
        behavior,
      });
    },
    [scrollAreaRef, lastMessageRef],
  );

  useEffect(() => {
    socket.on('chat-joined', ({ chat, onlineUsers }) => {
      setIsLoading(false);
      dispatch(setCurrentChat(chat));
      dispatch(setMessages(chat.messages));
      dispatch(setOnlineUsers(onlineUsers));
    });

    socket.emit('user-join-chat', { chatId });

    socket.on('new-message', message => {
      dispatch(addMessage(message));
      scrollToLastMessage({ behavior: 'smooth' as ScrollBehavior });
    });

    return () => {
      if (!socket) return;
      socket.off('new-message');
      socket.off('chat-joined');
      socket.emit('user-leave-chat', { chatId });
    };
  }, [chatId]);

  useEffect(() => {
    scrollToLastMessage({ behavior: 'instant' as ScrollBehavior });
  }, [chatId, lastMessageRef?.current]);

  if (isLoading) {
    return (
      <div className='relative w-full h-[320px] flex items-center justify-center lg:min-w-[500px]'>
        <Spinner size='lg' />
      </div>
    );
  }

  return (
    <div className='relative w-full flex-1 lg:min-w-[500px]'>
      <div className='flex items-center justify-between mb-8 W-full'>
        <div className='grid gap-2'>
          <p className='text-2xl/[24px] font-semibold text-black'>
            {otherMembers
              ?.map(({ first_name, last_name }: User) => `${first_name} ${last_name ?? ''}`)
              .join(', ')}
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Link
            className={cn(buttonVariants({ variant: 'tertiary' }), 'p-0 w-fit h-fit')}
            to={`media`}
          >
            <Media className='text-dark-grey' />
          </Link>
          <Link
            className={cn(buttonVariants({ variant: 'tertiary' }), 'p-0 w-fit h-fit')}
            to={`search`}
          >
            <SearchLoupe />
          </Link>
        </div>
      </div>
      <div
        className='h-[320px] mb-[100px] py-2 overflow-y-auto overflow-x-hidden scrollbar-w-2 scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-thumb-rounded'
        ref={scrollAreaRef}
      >
        <div className='mt-4 flex flex-col w-full pr-4 overflow-x-hidden	'>
          {!!messages &&
            messages.map((message: Message, index) => {
              const isAuthor = message.userId === user.id;
              const hasNextMessage = messages[index + 1]?.userId === message.userId;

              if (messages.length - 1 === index) {
                return (
                  <div
                    ref={lastMessageRef}
                    key={message.id}
                    className={cn({ 'self-end': isAuthor })}
                  >
                    <MessageElement message={message} hasNextMessage={hasNextMessage} />
                  </div>
                );
              }

              return (
                <MessageElement
                  key={message.id}
                  message={message}
                  hasNextMessage={hasNextMessage}
                />
              );
            })}
        </div>
      </div>
      <div className='absolute bottom-20 w-full'>
        {/* {imageUrl && <img src={imageUrl} alt='image' width={20} height={20} />}
        hello there */}
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

  const isAuthor = user.id === message.userId;

  const fallback = `${message.user?.first_name?.[0]}${message.user?.last_name?.[0] ?? ''}` || '';

  return (
    <div className={cn('flex gap-2 self-start whitespace-normal', { 'self-end': isAuthor })}>
      {!isAuthor && (
        <UserAvatar
          className={cn('w-8 h-8 self-end', { invisible: hasNextMessage })}
          path={message.user.profile?.avatar}
          isOnline={isOnline}
          fallback={fallback}
        />
      )}
      <div
        className={cn(
          'inline-flex flex flex-col max-w-md mx-3 my-4 p-2 rounded-tr-2xl rounded-tl-2xl bg-inactive break-words w-[200px] sm:w-auto',
          { 'rounded-bl-2xl': isAuthor, 'rounded-br-2xl': !isAuthor },
        )}
      >
        <p className='text-black text-sm font-medium'>{message.messageContent}</p>
        {!!message.attachment && <img loading='lazy' src={message.attachment} />}
        <span className='text-dark-grey text-body-small font-medium text-end text-sm '>
          {!!message.createdAt && format(new Date(message.createdAt), 'HH:mm')}
        </span>
      </div>
      {!!isAuthor && (
        <UserAvatar
          className={cn('w-8 h-8 self-end', { invisible: hasNextMessage })}
          path={message.user.profile?.avatar}
          isOnline={isOnline}
          fallback={fallback}
        />
      )}
    </div>
  );
};

function UserAvatar({
  path,
  isOnline,
  className,
  fallback,
}: {
  path: string;
  isOnline: boolean;
  className?: string;
  fallback: string;
}) {
  return (
    <Avatar className={cn('relative overflow-visible', className)}>
      <AvatarImage src={path} className='rounded-full' />
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
