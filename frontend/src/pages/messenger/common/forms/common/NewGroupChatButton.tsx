import React, { useState } from 'react';
import { Button } from 'src/common/components/ui/common/Button';
import { ReactComponent as Group } from 'src/assets/icons/group-chat.svg';
import { Modal } from 'src/common/components/ui/common/Modal/Modal';
import { CreateGroupChatForm } from '../CreateGroupChatForm';

export function NewGroupChatButton() {
  const [open, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant='message'
        size='message'
        onClick={() => setIsOpen(true)}
        className='flex items-center ml-[16px]'
      >
        <Group className='w-5 h-5 mr-2' />
        new group chat
      </Button>
      <Modal
        open={open}
        onOpenChange={setIsOpen}
        title='Create new group chat'
        className='max-w-[600px] w-full'
      >
        <CreateGroupChatForm onCreate={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}
