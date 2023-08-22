import * as React from 'react';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/common/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card } from 'src/components/ui/common/Card';
import { CreateTimeCardForm } from 'src/components/CreateTimeCardForm';
import { GoBackButton } from 'src/components/ui/common/GoBackButton';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().max(12, { message: 'Password has to be at most 12 characters long' }),
});

export function CreateTimeCardPage() {
  return (
    <div className='ml-16'>
      <div className='flex flex-col space-y-6 mt-6'>
        <GoBackButton path='/timecard' className="text-dark-grey">All timecards</GoBackButton>
        <h2 className='text-4xl font-bold'>Create timecard</h2>
        <Card className='max-w-[400px]'>
          <CreateTimeCardForm />
        </Card>
      </div>
    </div>
  );
}
