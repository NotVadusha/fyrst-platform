import React from 'react';
import { Modal } from 'src/common/components/ui/common/Modal/Modal';
import { PaymentGateway } from './PaymentGateway';

type CardModalProps = {
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  onPaymentComplete: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  open: boolean;
  paymentId: number;
};

export const CardModal: React.FC<CardModalProps> = ({
  onOpenChange,
  onPaymentComplete,
  open,
  paymentId,
}) => {
  return (
    <Modal onOpenChange={onOpenChange} open={open} title='Make a payment' className='w-[550px]'>
      <PaymentGateway
        paymentId={paymentId}
        onOpenChange={onOpenChange}
        onPaymentComplete={onPaymentComplete}
      />
    </Modal>
  );
};
