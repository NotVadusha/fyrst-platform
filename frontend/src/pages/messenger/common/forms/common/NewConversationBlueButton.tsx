import React, { useState } from 'react';

import { Button } from 'src/common/components/ui/common/Button';
import emptyMessanger from 'src/assets/empty-messanger.png';
import { Modal } from 'src/common/components/ui/common/Modal/Modal';
import { SearchUserForm } from '../SearchUserForm';

export function NewConversationBlueButton({ className }: { className?: string }) {
  const [open, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className={className}>
        New Conversation
      </Button>
      <Modal
        open={open}
        onOpenChange={setIsOpen}
        title='New Message'
        className='w-full md:max-w-[450px]'
      >
        <SearchUserForm onSelect={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}
