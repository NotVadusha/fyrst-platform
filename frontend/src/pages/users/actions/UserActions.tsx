import React, { useState } from 'react';
import { Button } from 'src/common/components/ui/common/Button';
import { User } from 'src/common/types';
import { ReactComponent as Settings } from 'src/assets/icons/settings.svg';
import { Modal } from 'src/common/components/ui/common/Modal/Modal';
import { EditUserForm } from './EditUserForm';

export function UserActions({ user }: { user: User }) {
  const [open, setIsOpen] = useState(false);

  return (
    <div className='w-full flex items-center'>
      <Button
        variant={'secondary'}
        className='text-grey p-0 border-none bg-background'
        onClick={() => setIsOpen(true)}
      >
        <Settings className='w-8 h-8 text-dark-grey' />
      </Button>
      <Modal open={open} onOpenChange={setIsOpen} title={`${user.first_name} ${user.last_name}`}>
        <EditUserForm user={user} />
      </Modal>
    </div>
  );
}
