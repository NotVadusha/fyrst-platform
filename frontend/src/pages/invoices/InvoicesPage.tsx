import React from 'react';
import { Header } from '../../common/components/ui/layout/Header/Header';
import InvoicesList from './InvoicesList';

const InvoicesPage = () => {
  return (
    <div>
      <Header title='Invoices' />
      <div>
        <InvoicesList />
      </div>
    </div>
  );
};

export default InvoicesPage;
