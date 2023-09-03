import { MoreHorizontal, Paperclip } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from 'src/common/components/ui/common/Button';
import { Modal } from 'src/common/components/ui/common/Modal/Modal';
import { useSendNewMessageMutation } from 'src/common/store/api/packages/chat/chatApi';
import { FileUploadForm } from './FileUploadForm';
import { Form, FormField, FormItem, FormMessage } from 'src/common/components/ui/common/Form/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { socket } from 'src/common/helpers/socket';
import { TypingUser } from 'shared/socketEvents';
import { useAppSelector } from 'src/common/hooks/redux';

const messageSchema = yup.object().shape({
  messageContent: yup.string().max(60, 'Message is too long'),
});

type Inputs = yup.InferType<typeof messageSchema>;

export function NewMessageInput({ chatId }: { chatId: string }) {
  const user = useAppSelector(state => state.user);

  const [isTyping, setIsTyping] = useState<boolean>(false);

  const [open, setIsOpen] = useState<boolean>(false);

  const [sendNewMessage, result] = useSendNewMessageMutation();

  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);

  function handleNewMessage({ messageContent }: { messageContent: string }) {
    sendNewMessage({
      chatId,
      message: {
        messageContent,
      },
    });
    form.resetField('messageContent');
  }

  const form = useForm<Inputs>({
    resolver: yupResolver<Inputs>(messageSchema),
    defaultValues: {
      messageContent: '',
    },
  });

  function onSubmit(val: Inputs) {
    if (!val.messageContent) return;
    console.log(val);
    handleNewMessage({ messageContent: val.messageContent });
  }

  useEffect(() => {
    socket.on('user-typing', ({ user }) => {
      console.log(user);
      setTypingUsers(prev => [...prev, user]);
    });
  }, []);

  useEffect(() => {
    if (isTyping) {
      console.log('here');
      socket.emit('user-type', { user: { id: user.id, first_name: user.first_name }, chatId });
    }
  }, [isTyping, chatId]);

  return (
    <>
      <div className='relative'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='messageContent'
              render={({ field }) => (
                <FormItem>
                  <input
                    type='text'
                    placeholder='Message'
                    className='p-4 pr-12 rounded-2xl w-full bg-[#DBDBDB]'
                    onKeyDown={event => {
                      if (!form.getValues('messageContent')) setIsTyping(false);
                      else {
                        setIsTyping(true);
                      }
                      if (event.key === 'Enter') {
                        form.handleSubmit(onSubmit);
                      }
                    }}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Button
          variant={'tertiary'}
          className='absolute top-4 right-4 w-fit h-fit p-0 text-dark-grey'
          onClick={() => setIsOpen(true)}
        >
          <Paperclip className='w-6 h-6' />
        </Button>
        <div className='text-sm mt-2 flex items-center gap-2 text-grey'>
          {typingUsers &&
            `${typingUsers.map(({ first_name }) => first_name).join(', ')} ${
              typingUsers.length > 1 ? 'are' : 'is'
            } typing`}
          <MoreHorizontal className='animate-pulse text-black' />
        </div>
      </div>
      <Modal title='Upload an image' open={open} onOpenChange={setIsOpen}>
        <FileUploadForm />
      </Modal>
    </>
  );
}
