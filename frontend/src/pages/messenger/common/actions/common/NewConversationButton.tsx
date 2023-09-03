import React, { useState } from 'react';
import { Button } from 'src/common/components/ui/common/Button';
import { Modal } from 'src/common/components/ui/common/Modal/Modal';
import { CreateConversationForm } from '../CreateConversationForm';
import { ReactComponent as Pencil } from 'src/assets/icons/pencil.svg';

export function NewConversationButton() {
  const [open, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant='message'
        size='message'
        onClick={() => setIsOpen(true)}
        className='flex items-center'
      >
        <Pencil className='w-5 h-5 mr-2' />
        new conversation
      </Button>
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
