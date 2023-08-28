import * as React from 'react';

import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem } from 'src/components/ui/common/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { Button } from 'src/ui/common/Button';
import TextInput from 'src/components/ui/common/TextInput/TextInput';
import { chatSchema } from 'src/lib/validations/chat';
import { useCreateChatMutation } from 'src/store/reducers/chat/chatApi';

export type Inputs = y.InferType<typeof chatSchema>;

export function CreateChatForm() {
  const [createChat, result] = useCreateChatMutation();

  const form = useForm<Inputs>({
    resolver: yupResolver(chatSchema),
    defaultValues: {
      name: 'asda',
      member: 'asd@gmail.com',
    },
  });

  async function onSubmit(values: Inputs) {
    // handleSubmit(values);
    console.log(values);
    createChat({ name: values.name, members: [values.member] });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <TextInput control={form.control} type='text' label='Group name' {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='member'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <TextInput control={form.control} type='text' label="Member's email" {...field} />
            </FormItem>
          )}
        />
        <Button type='submit' variant='primary' className='w-full'>
          Create
        </Button>
      </form>
    </Form>
  );
}
