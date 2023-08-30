import React, { useState } from 'react';
import { useSendNewMessageMutation } from 'src/store/reducers/chat/chatApi';

export function NewMessageInput({ chatId }: { chatId: string }) {
  const [value, setValue] = useState<string>('');

  const [sendNewMessage, result] = useSendNewMessageMutation();

  function handleNewMessage() {
    sendNewMessage({
      chatId,
      message: {
        messageContent: value,
      },
    });
  }

  return (
    <input
      type='text'
      placeholder='Message'
      className='w-full p-4 rounded-2xl bg-[#DBDBDB]'
      value={value}
      onChange={event => setValue(event.target.value)}
      onKeyDown={event => {
        if (event.key !== 'Enter' || !value) return;
        handleNewMessage();
        setValue('');
      }}
    />
  );
}
