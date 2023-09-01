import React, { useEffect, useState } from 'react';
import { Messanger } from './common/messanger/Messanger';
import { Header } from 'src/common/components/ui/layout/Header/Header';
import { Button } from 'src/common/components/ui/common/Button';
import { Modal } from 'src/common/components/ui/common/Modal/Modal';
import { CreateChatForm } from './CreateChatForm';
import { socket } from 'src/common/config/packages/socket/socket.config';
import { useAppDispatch, useAppSelector } from 'src/common/hooks/redux';
import {
  addOnlineUser,
  removeOnlineUser,
} from 'src/common/store/slices/packages/messenger/messangerSlice';

const MessangerPage = () => {
  const [open, setIsOpen] = useState(false);

  const user = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on('user-online', ({ userId }) => {
      dispatch(addOnlineUser({ userId }));
    });

    socket.on('user-offline', ({ userId }) => {
      dispatch(removeOnlineUser({ userId }));
    });

    if (!user?.id) return;

    socket.emit('user-online', { userId: user.id });

    return () => {
      if (!user?.id) return;
      socket.emit('user-offline', { userId: user.id });
      socket.off('user-offline');
      socket.off('user-online');
    };
  }, [user?.id]);

  return (
    <>
      <div>
        <Header title='Messages' />
        <div className='lg:mx-20 mx-10 grid gap-4'>
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
