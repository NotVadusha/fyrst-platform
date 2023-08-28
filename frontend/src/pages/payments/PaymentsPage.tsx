import React from 'react';
import { Header } from '../../components/ui/layout/Header/Header';
import PaymentsList from '../../components/PaymentsList/PaymentsList';

const PaymentsPage = () => {
  return (
    <div>
      <Header title='Payments' />
      <div>
        <PaymentsList />
      </div>
    </div>
  );
};

export default PaymentsPage;
