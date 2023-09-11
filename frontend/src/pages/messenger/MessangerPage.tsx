import React, { useContext, useEffect, useState } from 'react';
import { Messanger } from './common/messanger/Messanger';
import { Header } from 'src/common/components/ui/layout/Header/Header';
import { useAppDispatch, useAppSelector } from 'src/common/hooks/redux';
import {
  addOnlineUser,
  removeOnlineUser,
} from 'src/common/store/slices/packages/messenger/messangerSlice';
import { NewConversationButton } from './common/forms/common/NewConversationButton';
import { NewGroupChatButton } from './common/forms/common/NewGroupChatButton';
import { SocketContext } from 'src/common/config/packages/socket/socket.config';

const MessangerPage = () => {
  const user = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();

  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket.active) socket.connect();

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

      socket.disconnect();
    };
  }, [user?.id]);

  return (
    <>
      <div>
        <Header title='Messages' />
        <div className='lg:mx-20 mx-4 md:mx-10 grid gap-4'>
          <p className='text-[h6] font-semibold text-dark-grey mt-5'>Messages</p>
          <div className='flex space-x-4'>
            <NewConversationButton />
            <NewGroupChatButton />
          </div>
          <Messanger />
        </div>
      </div>
    </>
  );
};

export default MessangerPage;
