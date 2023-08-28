import React, { useState } from 'react';
import { socket } from 'src/lib/socket';
import { useSendNewMessageMutation } from 'src/store/reducers/chat.service';
import { format } from 'date-fns';

export function NewMessageInput({ chatId }: { chatId: string }) {
  const [value, setValue] = useState<string>('');

  const [sendNewMessage, result] = useSendNewMessageMutation();

  function handleNewMessage() {
    sendNewMessage({
      chatId,
      message: {
        messageContent: value,
        time: format(new Date(), 'yyyy-mm-dd'),
      },
    });
  }

  return (
    <input
      type='text'
      placeholder='Message'
      className='w-full p-4 rounded-2xl bg-[#DBDBDB]'
      value={value}
      onChange={e => setValue(e.target.value)}
      onKeyDown={e => {
        if (e.key !== 'Enter' || !value) return;
        handleNewMessage();
      }}
    />
  );
}
