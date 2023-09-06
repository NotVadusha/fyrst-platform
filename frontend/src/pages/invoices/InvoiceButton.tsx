import React from 'react';
import { ReactComponent as Eye } from 'src/assets/icons/eye-on.svg';
import { invoicesApi } from 'src/common/store/api/packages/invoices/invoicesApi';

interface InvoiceButtonProps {
  id: number;
}

export const InvoiceButton: React.FC<InvoiceButtonProps> = ({ id }) => {
  const [getPdf, { data, isFetching }] = invoicesApi.useLazyGetPdfLinkQuery();

  const handleInvoiceClick = async () => {
    try {
      if (!isFetching) {
        const linkResponse = await getPdf(id).unwrap();
        if (linkResponse.link) window.open(linkResponse.link, '_blank', 'noreferrer')?.focus();
      }
    } catch (err) {}
  };

  return (
    <div className='w-5 h-5 hover:cursor-pointer' onClick={handleInvoiceClick}>
      <Eye />
    </div>
  );
};
