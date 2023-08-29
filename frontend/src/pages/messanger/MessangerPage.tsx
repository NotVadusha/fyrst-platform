import React, { useState } from 'react';
import { Messanger } from './common/messanger/Messanger';
import { Header } from 'src/components/ui/layout/Header/Header';
import { Button } from 'src/ui/common/Button';
import { Modal } from 'src/components/ui/common/Modal';
import { CreateChatForm } from './CreateChatForm';

const MessangerPage = () => {
  const [open, setIsOpen] = useState(false);

  return (
    <>
      <div>
        <Header title='Messages' />
        <div className='mx-20 grid gap-4'>
          <p className='text-[h6] font-semibold text-dark-grey mt-5'>Messages</p>
          <div className='flex space-x-4'>
            <Button variant='message' size='message' onClick={() => setIsOpen(true)}>
              New Conversation
            </Button>
          </div>
          <Messanger />
        </div>
      </div>
      <Modal open={open} onOpenChange={setIsOpen} title='New Conversation'>
        <CreateChatForm />
      </Modal>
    </>
  );
};

export default MessangerPage;
