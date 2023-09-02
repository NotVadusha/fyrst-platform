import React, { useState } from 'react';
import { Modal } from 'src/common/components/ui/common/Modal/Modal';
import { Button } from 'src/common/components/ui/common/Button';
import { EditUserFormInputs, EditUserForm } from './EditUserForm';
import { useAddUserMutation } from 'src/common/store/api/packages/user/userApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'src/common/components/ui/common/Toast/useToast';

export function AddUserButton() {
  const [open, setIsOpen] = useState(false);
  const [addUser, { isLoading: isAddUserLoading }] = useAddUserMutation();
  const navigate = useNavigate();

  function handleSubmitAddUser(values: EditUserFormInputs) {
    addUser({ ...values })
      .unwrap()
      .then(() => {
        navigate(0);
        toast({ title: 'Success', description: 'User successfully added' });
      })
      .catch(error => error);
  }

  return (
    <>
      <Button variant='primary' onClick={() => setIsOpen(true)}>
        Add User
      </Button>
      <div>
        <Modal title='Add user' open={open} onOpenChange={setIsOpen}>
          <EditUserForm isLoading={isAddUserLoading} onSubmit={handleSubmitAddUser} />
        </Modal>
      </div>
    </>
  );
}
