import React from 'react';
import PaymentsList from './PaymentsList';
import { PaymentHeader } from '../common/PaymentHeader';

const PaymentsPage = () => {
  return (
    <div>
      <PaymentHeader />
      <div>
        <PaymentsList />
      </div>
    </div>
  );
};

export default PaymentsPage;
