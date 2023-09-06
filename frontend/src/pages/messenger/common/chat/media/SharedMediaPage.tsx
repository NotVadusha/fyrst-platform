import React, { useEffect, useCallback, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { buttonVariants } from 'src/common/components/ui/common/Button/Button';
import { cn } from 'src/common/helpers/helpers';
import { useGetMessagesWithMediaQuery } from 'src/common/store/api/packages/chat/chatApi';
import { Avatar, AvatarFallback, AvatarImage } from 'src/common/components/ui/common/Avatar/Avatar';
import { Message } from 'shared/socketEvents';
import { format } from 'date-fns';
import { ScrollArea } from 'src/common/components/ui/common/ScrollArea/ScrollArea';

export function SharedMediaPage() {
  const { chatId } = useParams();

  if (!chatId) return <>Not found</>;

  const { data, refetch, isSuccess } = useGetMessagesWithMediaQuery({
    chatId,
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className='w-full min-h-[460px]'>
      <div className='flex w-full gap-2 items-center'>
        <Link
          relative='path'
          to={`/chat/${chatId}`}
          className={cn(buttonVariants({ variant: 'tertiary' }), 'w-fit h-fit p-0')}
        >
          <ChevronLeft />
        </Link>
        <h1 className='text-black text-2xl'>Shared media</h1>
      </div>
      <ScrollArea className='h-[400px]'>
        {isSuccess && !!data.length && (
          <div className='my-2 text-dark-grey'>{data.length} messages found</div>
        )}
        <div className='flex flex-col gap-2 w-full'>
          {!!data?.length ? (
            data?.map(message => <UserMessageItem message={message} key={message.id} />)
          ) : (
            <span className='text-sm text-grey'>No shared media</span>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

function UserMessageItem({ message }: { message: Message }) {
  return (
    <div className='flex justify-between p-2 truncate w-full whitespace-nowrap overflow-hidden'>
      <div className='flex gap-2 items-center'>
        <Avatar className='self-start'>
          <AvatarImage
          //   src={message.user.profile.avatar}
          />
          <AvatarFallback>{`${message.user?.first_name?.[0]}${
            message.user?.last_name?.[0] ?? ''
          }`}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-1 max-w-[100%] whitespace-nowrap overflow-hidden'>
          <span className='text-black text-md font-bold'>
            {message.user.first_name} {message.user.last_name}
          </span>
          <span className='text-sm text-dark-grey'>{message.messageContent}</span>
          {!!message.attachment && <img src={message.attachment} className='pr-2' />}
        </div>
      </div>
      <span className='self-center text-dark-grey text-sm pr-2'>
        {message.createdAt && format(new Date(message.createdAt), 'HH:mm')}
      </span>
    </div>
  );
}
