import React, { useState } from 'react';
import { Button } from 'src/common/components/ui/common/Button';
import { User } from 'src/common/packages/user/types/models/User.model';
import { ReactComponent as Settings } from 'src/assets/icons/settings.svg';
import { Modal } from 'src/common/components/ui/common/Modal/Modal';
import { EditUserForm, EditUserFormInputs } from './EditUserForm';
import { useUpdateUserMutation } from 'src/common/store/api/packages/user/userApi';
import { useNavigate } from 'react-router-dom';

export function UserActions({ user }: { user: User }) {
  const [open, setIsOpen] = useState(false);
  const [editUser, { isLoading: isEditUsersLoading }] = useUpdateUserMutation();
  const navigate = useNavigate();

  function handleSubitEditUser(values: EditUserFormInputs) {
    editUser({
      id: user.id,
      user: { ...values },
    })
      .unwrap()
      .then(() => navigate(0));
  }

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
        <EditUserForm user={user} isLoading={isEditUsersLoading} onSubmit={handleSubitEditUser} />
      </Modal>
    </div>
  );
}
