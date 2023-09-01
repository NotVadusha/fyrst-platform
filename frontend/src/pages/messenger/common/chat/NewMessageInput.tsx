import { Paperclip } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from 'src/common/components/ui/common/Button';
import { Modal } from 'src/common/components/ui/common/Modal/Modal';
import { Textarea } from 'src/common/components/ui/common/Textarea/Textarea';
import { useSendNewMessageMutation } from 'src/common/store/api/packages/chat/chatApi';
import { FileUploadForm } from './FileUploadForm';

export function NewMessageInput({ chatId }: { chatId: string }) {
  const [value, setValue] = useState<string>('');

  const [open, setIsOpen] = useState<boolean>(false);

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
    <>
      <div className='relative'>
        <Textarea
          placeholder='Message'
          className='min-h-fit rounded-2xl min-w-fit bg-[#DBDBDB]'
          value={value}
          onChange={event => setValue(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter' && event.shiftKey) return;
            if (event.key !== 'Enter' || !value.replaceAll('\n', '')) return;
            else if (event.key === 'Enter' && value.replaceAll('\n', '')) {
              handleNewMessage();
              setValue('');
            }
          }}
        />
        <Button
          variant={'tertiary'}
          className='absolute top-4 right-4 w-fit h-fit p-0 text-dark-grey'
          onClick={() => setIsOpen(true)}
        >
          <Paperclip className='w-6 h-6' />
        </Button>
      </div>
      <Modal title='Upload an image' open={open} onOpenChange={setIsOpen}>
        <FileUploadForm />
      </Modal>
    </>
  );
}
