import React, { useState } from 'react';
import { Messanger } from './common/messanger/Messanger';
import { Header } from 'src/components/ui/layout/Header/Header';
import { Button } from 'src/ui/common/Button';
import { ReactComponent as PencilIcon } from 'src/icons/pencil.svg';
import { ReactComponent as GroupChatIcon } from 'src/icons/group-chat.svg';
import { useGetAllUsersQuery } from 'src/store/services';
import { Modal } from 'src/components/ui/common/Modal';
import { UserDefaultResponse } from 'types/dto/UserDto';

const MessangerPage = () => {
  const { data: users } = useGetAllUsersQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDefaultResponse | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUserSelect = (user: UserDefaultResponse) => {
    setSelectedUser(user);
  };

  return (
    <>
      <div>
        <Header title='Messages' />
        <div className='mx-20 grid gap-4'>
          <p className='text-[h6] font-semibold text-dark-grey mt-5'>Messages</p>
          <div className='flex space-x-4'>
            <Button variant='message' size='message' onClick={openModal}>
              New Conversation
            </Button>
            <Button variant='message' size='message' onClick={openModal}>
              New Group Chat
            </Button>
          </div>
          <Messanger />
        </div>
      </div>
      <Modal open={isModalOpen} onOpenChange={closeModal} title='New Conversation'>
        {users && (
          <ul>
            {users.map(user => (
              <li key={user.id} onClick={() => handleUserSelect(user)}>
                {user.first_name}
              </li>
            ))}
          </ul>
        )}
        {selectedUser && (
          <div>
            <p>You selected: {selectedUser.first_name}</p>
            {/* Add logic here to handle the selected user */}
          </div>
        )}
      </Modal>
    </>
  );
};

export default MessangerPage;
