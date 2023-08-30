import React, { useState } from 'react';
import { Modal } from 'src/components/ui/common/Modal';
import { Button } from 'src/ui/common/Button';
import { AddUserForm } from './AddUserForm';

export function AddUserButton() {
  const [open, setIsOpen] = useState(false);

  return (
    <>
      <Button variant='primary' onClick={() => setIsOpen(true)}>
        Add User
      </Button>
      <div>
        <Modal title='Add user' open={open} onOpenChange={setIsOpen}>
          <AddUserForm />
        </Modal>
      </div>
    </>
  );
}
