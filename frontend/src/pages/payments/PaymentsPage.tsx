import React from 'react';
import { Header } from '../../common/components/ui/layout/Header/Header';
import PaymentsList from './PaymentsList/PaymentsList';

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
