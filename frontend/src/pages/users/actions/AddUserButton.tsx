import React, { useState } from 'react';
import { Modal } from 'src/common/components/ui/common/Modal/Modal';
import { Button } from 'src/common/components/ui/common/Button';
import { EditUserFormValues, EditUserForm } from './EditUserForm/EditUserForm';
import { useAddUserMutation } from 'src/common/store/api/packages/user/userApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import { ReactComponent as AddIcon } from 'src/assets/icons/add.svg';

export function AddUserButton() {
  const [open, setIsOpen] = useState(false);
  const [addUser, { isLoading: isAddUserLoading }] = useAddUserMutation();
  const navigate = useNavigate();

  function handleSubmitAddUser(values: EditUserFormValues) {
    addUser({ ...values })
      .unwrap()
      .then(() => {
        navigate(0);
        toast({ title: 'Success', description: 'User successfully added', variant: 'success' });
      })
      .catch(error => error);
  }

  return (
    <>
      <Button
        variant='primary'
        className='text-sm md:text-base px-[16px] md:px-[32px]'
        onClick={() => setIsOpen(true)}
      >
        <span className='hidden md:inline'>Add user</span>
        <AddIcon className='md:hidden w-8 h-8' />
      </Button>
      <div>
        <Modal
          title='Add user'
          open={open}
          onOpenChange={setIsOpen}
          className='w-full md:max-w-[593px]'
        >
          <EditUserForm isLoading={isAddUserLoading} onSubmit={handleSubmitAddUser} />
        </Modal>
      </div>
    </>
  );
}
