import React, { useState } from 'react';

import { Button } from 'src/common/components/ui/common/Button';
import emptyMessanger from 'src/assets/empty-messanger.png';
import { Modal } from 'src/common/components/ui/common/Modal/Modal';
import { CreateConversationForm } from '../forms/CreateConversationForm';

export function NoConversations() {
  const [open, setIsOpen] = useState(false);

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
        <CreateConversationForm onCreate={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}
