import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from 'src/common/components/ui/common/Button';

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: 'UI/Common/Modal',
  decorators: [
    Story => (
      <div style={{ minHeight: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Modal>;

const ModalWrapper = () => {
  const [open, setIsOpen] = useState(false);

  return (
    <>
      <Button variant='primary' onClick={() => setIsOpen(true)}>
        Open
      </Button>
      <Modal title='Modal title' open={open} onOpenChange={setIsOpen}>
        Modal content
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalWrapper />,
};
