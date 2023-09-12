import React from 'react';
import { Modal } from 'src/common/components/ui/common/Modal/Modal';
import { PaymentGateway } from './PaymentGateway';

type CardModalProps = {
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  paymentId: number;
};

export const CardModal: React.FC<CardModalProps> = ({ onOpenChange, open, paymentId }) => {
  return (
    <Modal onOpenChange={onOpenChange} open={open} title='Make a payment' className='w-[550px]'>
      <PaymentGateway paymentId={paymentId} onOpenChange={onOpenChange} />
    </Modal>
  );
};
