import React, { useCallback, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useDebounce } from 'src/hooks/useDebounce';
import { SearchInput } from '../../conversation/common/SearchInput';
import { ChevronLeft } from 'lucide-react';
import { buttonVariants } from 'src/common/components/ui/common/Button/Button';
import { cn } from 'src/common/helpers/helpers';
import {
  MessageFilters,
  useGetMessagesByParamsQuery,
} from 'src/common/store/api/packages/chat/chatApi';
import { Avatar, AvatarFallback, AvatarImage } from 'src/common/components/ui/common/Avatar/Avatar';
import { Message } from 'shared/socketEvents';
import { format } from 'date-fns';

export function SearchChatMessagesPage() {
  const { chatId } = useParams();

  if (!chatId) return <>Not found</>;

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filters: MessageFilters = {
    messageContent: debouncedSearchQuery ?? null,
  };

  Object.keys(filters).forEach(key => {
    filters[key as keyof MessageFilters] === null && delete filters[key as keyof MessageFilters];
  });

  const handleChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const { data, isSuccess } = useGetMessagesByParamsQuery({
    chatId,
    filters,
  });

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
        <SearchInput
          value={searchQuery}
          onChange={handleChange}
          placeholder='Search'
          className='w-full'
        />
      </div>
      {isSuccess && !!data.length && (
        <div className='my-2 text-dark-grey'>{data.length} messages found</div>
      )}
      <div className='flex flex-col gap-2 w-full'>
        {data?.map(message => (
          <UserMessageItem message={message} key={message.id} />
        ))}
      </div>
    </div>
  );
}

function UserMessageItem({ message }: { message: Message }) {
  return (
    <div className='flex justify-between p-2 truncate w-full whitespace-nowrap overflow-hidden'>
      <div className='flex gap-2 items-center'>
        <Avatar>
          <AvatarImage src={message.user.profile?.avatar} />
          <AvatarFallback>{`${message.user?.first_name?.[0]}${
            message.user?.last_name?.[0] ?? ''
          }`}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-1 max-w-[100%] whitespace-nowrap overflow-hidden '>
          <span className='text-black text-md font-bold'>
            {message.user.first_name} {message.user.last_name}
          </span>
          <span className='text-sm text-dark-grey'>{message.messageContent}</span>
        </div>
      </div>
      <span className='self-center text-dark-grey text-sm'>
        {message.createdAt && format(new Date(message.createdAt), 'HH:mm')}
      </span>
    </div>
  );
}
