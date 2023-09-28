import React from 'react';
import { Header } from '../../common/components/ui/layout/Header/Header';
import InvoicesList from './InvoicesList';

const InvoicesPage = () => {
  return (
    <>
      <Header title='Invoices' />
      <InvoicesList />
    </>
  );
};

export default InvoicesPage;
