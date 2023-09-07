import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Button } from '../Button';
import { Form } from '../Form/Form';
import { TabButton } from './TabButton';

export interface TabComponentProps<T extends FieldValues> {
  form: ReturnType<typeof useForm<T>>;
}

export interface MultiTabFormProps<T extends FieldValues> {
  form: ReturnType<typeof useForm<T>>;
  tabComponents: React.FC<TabComponentProps<T>>[];
  tabCaptions: string[];
  onSubmit: (values: T) => void;
  isLoading: boolean;
}

export function MultiTabForm<T extends FieldValues>({
  form,
  tabComponents,
  onSubmit,
  isLoading,
  tabCaptions,
}: MultiTabFormProps<T>) {
  const [tab, setTab] = useState<number>(0);

  const StepFields = tabComponents[tab];
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-2'>
            {tabCaptions.map((caption, index) => (
              <TabButton
                type='button'
                variant={index === tab ? 'active' : 'default'}
                tab={index}
                setTab={setTab}
                key={caption}
              >
                {caption}
              </TabButton>
            ))}
          </div>

          <StepFields form={form} />

          <Button type='submit' variant='primary' className='w-full'>
            {isLoading && <Loader2 className='w-8 h-8 animate-spin mr-2' />}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
