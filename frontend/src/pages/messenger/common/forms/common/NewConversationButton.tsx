import React, { useState } from 'react';
import { Button } from 'src/common/components/ui/common/Button';
import { Modal } from 'src/common/components/ui/common/Modal/Modal';
import { SearchUserForm } from '../SearchUserForm';
import { ReactComponent as Pencil } from 'src/assets/icons/pencil.svg';
import { User } from 'src/common/packages/user/types/models/User.model';
import { useCreateChatMutation } from 'src/common/store/api/packages/chat/chatApi';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import { useNavigate } from 'react-router-dom';

export function NewConversationButton() {
  const [createChat, result] = useCreateChatMutation();
  const [open, setIsOpen] = useState(false);

  const navigate = useNavigate();

  async function createConversation(user: User) {
    if (!user) return;
    createChat({ name: 'Any', members: [user.id] })
      .unwrap()
      .then(res => {
        toast({
          title: 'Success',
          description: 'New chat successfully created',
          variant: 'success',
        });
        setIsOpen(false);
        navigate(`/chat/${res?.id}`);
      })
      .catch(err => err);
  }

  return (
    <>
      <Button
        variant='message'
        size='message'
        onClick={() => setIsOpen(true)}
        className='flex items-center'
      >
        <Pencil className='w-5 h-5 mr-2' />
        New Conversation
      </Button>
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
