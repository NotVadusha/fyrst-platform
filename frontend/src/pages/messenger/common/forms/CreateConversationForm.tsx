import React, { useCallback, useState } from 'react';
import { useDebounce } from 'src/hooks/useDebounce';
import { SearchInput } from '../conversation/common/SearchInput';
import { useGetUsersByParamsQuery } from 'src/common/store/api/packages/user/userApi';
import { UserFilters } from 'src/common/packages/user/common/user-filters/types/models/UserFilters.model';
import { Avatar, AvatarFallback, AvatarImage } from 'src/common/components/ui/common/Avatar/Avatar';
import { User } from 'src/common/packages/user/types/models/User.model';
import { useCreateChatMutation } from 'src/common/store/api/packages/chat/chatApi';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';

export function CreateConversationForm({ onCreate }: { onCreate: () => void }) {
  const [createChat, result] = useCreateChatMutation();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const [isLoading, setIsLoading] = React.useState(false);

  const filters: UserFilters = {
    first_name: debouncedSearchQuery.split(' ')[0] ?? null,
    last_name: debouncedSearchQuery.split(' ')[1] ?? null,
  };

  Object.keys(filters).forEach(key => {
    filters[key as keyof UserFilters] === null && delete filters[key as keyof UserFilters];
  });

  const { data } = useGetUsersByParamsQuery({
    currentPage: 1,
    filters,
  });

  const handleChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  async function createConversation(user: User) {
    if (!user) return;
    createChat({ name: 'Any', members: [user.id] })
      .unwrap()
      .then(res => {
        setIsLoading(true);
        toast({ title: 'Success', description: 'New chat successfully created' });
        onCreate();
      })
      .catch(err => setIsLoading(false));
  }

  if (isLoading) {
    return <Spinner size='lg' />;
  }

  return (
    <>
      <SearchInput value={searchQuery} onChange={handleChange} placeholder='Search people' />
      <div className='flex flex-col min-h-[300px]'>
        {data?.users?.map(user => (
          <button
            key={user.id}
            className='w-full flex items-center px-1 py-2 gap-2  rounded-md cursor-pointer hover:bg-grey mt-2'
            onClick={() => createConversation(user as unknown as User)}
          >
            <Avatar className='w-6 h-6'>
              <AvatarImage
              //   src={message.user.profile.avatar}
              />
              <AvatarFallback>{`${user.first_name?.[0]}${
                user.last_name?.[0] ?? ''
              }`}</AvatarFallback>
            </Avatar>
            <span>
              {user.first_name} {user.last_name}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
