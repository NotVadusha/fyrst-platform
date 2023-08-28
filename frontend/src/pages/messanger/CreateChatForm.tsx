import * as React from 'react';

import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem } from 'src/components/ui/common/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { Button } from 'src/ui/common/Button';
import TextInput from 'src/components/ui/common/TextInput/TextInput';
import { chatSchema } from 'src/lib/validations/chat';

export type Inputs = y.InferType<typeof chatSchema>;

export function CreateChatForm() {
  const form = useForm<Inputs>({
    resolver: yupResolver(chatSchema),
    defaultValues: {
      member: '',
    },
  });

  async function onSubmit(values: Inputs) {
    // handleSubmit(values);
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='member'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <TextInput control={form.control} type='text' label="Member's email" {...field} />
            </FormItem>
          )}
        />
        <Button type='submit' variant='primary'>
          Create
        </Button>
      </form>
    </Form>
  );
}
