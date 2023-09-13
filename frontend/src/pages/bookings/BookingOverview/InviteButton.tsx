import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'src/common/components/ui/common/Button';
import { Modal } from 'src/common/components/ui/common/Modal/Modal';
import { User } from 'src/common/packages/user/types/models/User.model';
import { SearchUserForm } from 'src/pages/messenger/common/forms/SearchUserForm';
import { invitationSchema } from 'src/common/packages/invitation/validation-schemas/invitation.validation-schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from 'src/common/components/ui/common/Form/Form';
import TextInput from 'src/common/components/ui/common/Input/common/TextInput/TextInput';

import * as yup from 'yup';
import { Avatar, AvatarFallback, AvatarImage } from 'src/common/components/ui/common/Avatar/Avatar';
import { X } from 'lucide-react';
import { useCreateInvitationMutation } from 'src/common/store/api/packages/invitation/invitationApi';
import { toast } from 'src/common/components/ui/common/Toast/useToast';

type FormValues = yup.InferType<typeof invitationSchema>;

export function InviteButton({ bookingId }: { bookingId: number }) {
  const [open, setIsOpen] = useState(false);
  const [employee, setEmployee] = useState<User | undefined>();

  const [createInvitation] = useCreateInvitationMutation();

  const form = useForm<FormValues>({
    resolver: yupResolver<FormValues>(invitationSchema),
  });

  function onSubmit(values: FormValues) {
    if (!employee) return;
    createInvitation({ bookingId, employeeId: employee.id, ...values })
      .unwrap()
      .then(res => {
        toast({ title: 'Invitation successfully created' });
        setIsOpen(false);
      });
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Invite</Button>
      <Modal
        open={open}
        onOpenChange={setIsOpen}
        title='Invite an employee'
        className='max-w-[600px] w-full'
      >
        {!employee && <SearchUserForm onSelect={user => setEmployee(user)} />}
        {!!employee && (
          <Form {...form}>
            <div className='flex items-center gap-2 p-2 rounded-xl border border-grey w-fit grow-1 shrink-0	mb-4'>
              <Avatar className='w-6 h-6'>
                <AvatarImage src={employee.profile?.avatar || ''} />
                <AvatarFallback>{`${employee.first_name?.[0]}${
                  employee.last_name?.[0] ?? ''
                }`}</AvatarFallback>
              </Avatar>
              <span className='font-bold text-sm'>
                {employee.first_name} {employee.last_name}
              </span>
              <Button
                variant={'tertiary'}
                className='p-0 w-fit h-fit'
                onClick={() => setEmployee(undefined)}
              >
                <X className='text-blue w-4 h-4' />
              </Button>
            </div>
            <form action='' className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <TextInput
                        control={form.control}
                        min={new Date().toISOString().split('T')[0]}
                        type='date'
                        label='Date'
                        {...field}
                        value={String(field.value)}
                        onChange={e => field.onChange(e.target.value)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='time'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <TextInput
                        control={form.control}
                        min={new Date().toISOString().split('T')[0]}
                        type='time'
                        label='Time'
                        {...field}
                        value={String(field.value)}
                        onChange={e => field.onChange(e.target.value)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className='w-full'>Invite</Button>
            </form>
          </Form>
        )}
      </Modal>
    </>
  );
}
