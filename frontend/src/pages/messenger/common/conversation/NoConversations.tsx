import React, { useState } from 'react';

import { Button } from 'src/common/components/ui/common/Button';
import emptyMessanger from 'src/assets/empty-messanger.png';
import { Modal } from 'src/common/components/ui/common/Modal/Modal';
import { SearchUserForm } from '../forms/SearchUserForm';
import { User } from 'src/common/packages/user/types/models/User.model';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import { useCreateChatMutation } from 'src/common/store/api/packages/chat/chatApi';
import { useNavigate } from 'react-router-dom';

export function NoConversations() {
  const [createChat, result] = useCreateChatMutation();
  const [open, setIsOpen] = useState(false);

  const navigate = useNavigate();

  async function createConversation(user: User) {
    if (!user) return;
    createChat({ name: 'Any', members: [user.id] })
      .unwrap()
      .then(res => {
        toast({ title: 'Success', description: 'New chat successfully created' });
        setIsOpen(false);
        navigate(`/chat/${res?.id}`);
      })
      .catch(err => err);
  }

  return (
    <>
      <div className='flex items-center relative'>
        <img src={emptyMessanger} alt='Empty Messanger' />
        <div className='absolute flex flex-col gap-2 items-center'>
          <h1 className='text-center'>
            You don’t have any messages yet. Click the “New Conversation” to start new dialogue.
          </h1>
          <Button onClick={() => setIsOpen(true)}>New Conversation</Button>
        </div>
      </div>
      <Modal
        open={open}
        onOpenChange={setIsOpen}
        title='New Message'
        className='max-w-[600px] w-full'
      >
        <SearchUserForm onSelect={createConversation} />
      </Modal>
    </>
  );
}
