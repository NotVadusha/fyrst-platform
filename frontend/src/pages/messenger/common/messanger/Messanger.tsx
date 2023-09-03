import React, { useContext, useEffect } from 'react';
import { Conversations } from '../conversation/Conversations';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/common/hooks/redux';
import { NoConversations } from '../conversation/NoConversations';
import {
  addConversation,
  setConversations,
  updateConversation,
} from 'src/common/store/slices/packages/messenger/messangerSlice';
import { SocketContext } from 'src/common/config/packages/socket/socket.config';

const Messanger: React.FC = () => {
  const conversations = useAppSelector(state => state.messanger.conversations);
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('send-conversations', conversations => {
      dispatch(setConversations(conversations));
    });

    socket.on('conversation-update', data => {
      dispatch(updateConversation(data));
    });

    socket.on('new-conversation', conversation => {
      dispatch(addConversation(conversation));
    });

    if (!user?.id) return;

    socket.emit('get-conversations', { userId: user?.id });

    return () => {
      if (!socket) return;
      socket.off('send-conversations');
      socket.off('conversation-update');
      socket.off('new-conversation');
    };
  }, [user.id]);

  return (
    <>
      <div className='flex justify-center mt-8 xl:max-w-[1100px] md:mx-8'>
        {!!conversations.length && (
          <div className='w-full h-full bg-white shadow-md rounded-2xl'>
            <div className='flex flex-col xl:flex-row gap-2 xl:gap-4 p-6'>
              <Conversations />
              <hr className='border-b border-grey' />
              <Outlet />
            </div>
          </div>
        )}
        {!conversations.length && <NoConversations />}
      </div>
    </>
  );
};
export { Messanger };
