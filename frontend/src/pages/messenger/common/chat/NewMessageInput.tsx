import { MoreHorizontal, Paperclip } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
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
import { SocketContext } from 'src/common/config/packages/socket/socket.config';

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

  const socket = useContext(SocketContext);

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
    handleNewMessage({ messageContent: val.messageContent });
  }

  useEffect(() => {
    socket.on('user-typing', ({ user }) => {
      setTypingUsers(prev => {
        if (prev.some(u => u.id === user.id)) return prev;
        return [...prev, user];
      });
    });

    socket.on('user-stop-typing', ({ user }) => {
      setTypingUsers(prev => prev.filter(u => u.id !== user.id));
    });
  }, []);

  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = { user: { id: user.id, first_name: user.first_name }, chatId };
    console.log(event.target.value);
    if (!event.target.value) {
      setIsTyping(false);
      socket.emit('user-stop-type', data);
      return;
    }
    socket.emit('user-type', data);
    setIsTyping(true);

    if (typingTimeout) {
      setTypingTimeout(null);
    }

    setTypingTimeout(
      setTimeout(() => {
        setIsTyping(false);
        socket.emit('user-stop-type', data);
      }, 3000),
    );
  };

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        setTypingTimeout(null);
      }
    };
  }, [form, onSubmit, socket, user.id, user.first_name, chatId]);

  return (
    <>
      <div className='relative h-full'>
        <div className='relative mb-4'>
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
                        if (event.key === 'Enter') {
                          form.handleSubmit(onSubmit);
                        }
                      }}
                      {...field}
                      onChange={e => {
                        handleTyping(e);
                        field.onChange(e.target.value);
                      }}
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
          <div className='absolute mt-2 text-sm flex items-center gap-2 text-grey'>
            {!!typingUsers.length &&
              `${typingUsers.map(({ first_name }) => first_name).join(', ')} ${
                typingUsers.length > 1 ? 'are' : 'is'
              } typing`}
            {!!typingUsers.length && <MoreHorizontal className='animate-pulse text-black' />}
          </div>
        </div>
      </div>
      <Modal title='Upload an image' open={open} onOpenChange={setIsOpen}>
        <FileUploadForm />
      </Modal>
    </>
  );
}
