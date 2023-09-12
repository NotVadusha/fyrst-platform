import React from 'react';
import { Header } from '../../../common/components/ui/layout/Header/Header';
import PaymentsList from './PaymentsList';

const PaymentsPage = () => {
  return (
    <>
      <Header title='Payments' />
      <PaymentsList />
    </>
  );
};

export default PaymentsPage;
