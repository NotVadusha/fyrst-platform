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
import { Skeleton } from 'src/common/components/ui/common/Skeleton/Skeleton';
import Button from 'src/common/components/ui/common/Button/Button';
import { Loader2, X } from 'lucide-react';

export function CreateGroupChatForm({ onCreate }: { onCreate: () => void }) {
  const [createChat, result] = useCreateChatMutation();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const [isCreating, setIsCreating] = React.useState(false);

  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);

  const filters: UserFilters = {
    first_name: debouncedSearchQuery.split(' ')[0] ?? null,
    last_name: debouncedSearchQuery.split(' ')[1] ?? null,
  };

  Object.keys(filters).forEach(key => {
    filters[key as keyof UserFilters] === null && delete filters[key as keyof UserFilters];
  });

  const { data, isFetching, isSuccess, isLoading } = useGetUsersByParamsQuery({
    currentPage: 1,
    filters,
  });

  const handleChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  async function createConversation() {
    if (!selectedUsers.length) return;
    setIsCreating(true);
    createChat({ name: 'Any', members: selectedUsers.map(({ id }) => id) })
      .unwrap()
      .then(res => {
        toast({ title: 'Success', description: 'New chat successfully created' });
        onCreate();
        setIsCreating(false);
      })
      .catch(err => setIsCreating(false));
  }

  function removeSelectedUser(userId: number) {
    setSelectedUsers(prev => prev.filter(u => u.id !== userId));
  }

  return (
    <div className='w-full flex flex-col'>
      <SearchInput value={searchQuery} onChange={handleChange} placeholder='Search people' />
      {!!selectedUsers.length && (
        <>
          <div className='my-2 flex gap-2 flex-wrap'>
            {selectedUsers.map(user => (
              <div
                className='flex items-center gap-2 p-2 rounded-xl border border-grey w-fit grow-1 shrink-0	'
                key={`selected--${user.id}`}
              >
                <Avatar className='w-6 h-6'>
                  <AvatarImage
                  // src={user?.profile?.avatar}
                  />
                  <AvatarFallback>{`${user.first_name?.[0]}${
                    user.last_name?.[0] ?? ''
                  }`}</AvatarFallback>
                </Avatar>
                <span className='font-bold text-sm'>
                  {user.first_name} {user.last_name}
                </span>
                <Button
                  variant={'tertiary'}
                  className='p-0 w-fit h-fit'
                  onClick={() => removeSelectedUser(user.id)}
                >
                  <X className='text-blue w-4 h-4' />
                </Button>
              </div>
            ))}
          </div>
          <hr className='border-b border-grey' />
        </>
      )}
      <div className='flex flex-col min-h-[300px]'>
        {!isFetching && !!data?.users.length
          ? data?.users.map(user => (
              <button
                key={user.id}
                className='w-full flex items-center px-1 py-2 gap-2  rounded-md cursor-pointer hover:bg-grey mt-2'
                onClick={() => {
                  if (selectedUsers.some(u => u.id === user.id)) return;
                  setSelectedUsers(prev => [...prev, user as unknown as User]);
                }}
              >
                <Avatar className='w-6 h-6'>
                  <AvatarImage src='https://github.com/shadcn.png2' />
                  <AvatarFallback>{`${user.first_name?.[0]}${
                    user.last_name?.[0] ?? ''
                  }`}</AvatarFallback>
                </Avatar>
                <span>
                  {user.first_name} {user.last_name}
                </span>
              </button>
            ))
          : !isFetching &&
            debouncedSearchQuery && <div className='text-center mt-2'>No users found.</div>}
        {searchQuery && (isFetching || isLoading) && (
          <div className='flex flex-col gap-2'>
            {[1, 2, 3].map((_, i) => (
              <SelectUserButtonSkeleton key={i} />
            ))}
          </div>
        )}
      </div>
      <Button
        className='ml-auto'
        disabled={!selectedUsers.length}
        onClick={() => createConversation()}
      >
        {isCreating && <Loader2 className='mr-2 w-4 h-4 animate-spin' />}
        Next
      </Button>
    </div>
  );
}

function SelectUserButtonSkeleton() {
  return (
    <div className='w-full flex items-center px-1 py-2 gap-2 rounded-md mt-2'>
      <Skeleton className='h-6 w-6 rounded-full' />
      <Skeleton className='h-4 w-[120px]' />
    </div>
  );
}
