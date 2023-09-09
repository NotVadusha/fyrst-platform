import React, { MouseEvent } from 'react';
import { ReactComponent as Eye } from 'src/assets/icons/eye-on.svg';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import { invoicesApi } from 'src/common/store/api/packages/invoices/invoicesApi';

interface InvoiceButtonProps {
  id: number;
}

export const InvoiceButton: React.FC<InvoiceButtonProps> = ({ id }) => {
  const [getPdf, { isFetching }] = invoicesApi.useLazyGetPdfLinkQuery();

  const handleInvoiceClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (!isFetching) {
        const linkResponse = await getPdf(id).unwrap();
        if (linkResponse.link) window.open(linkResponse.link, '_blank', 'noreferrer')?.focus();
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Invoice in Pdf format',
        description: 'Cannot get a pdf file of the invoice, try again later',
      });
    }
  };

  return (
    <button className='w-5 h-5 hover:cursor-pointer' onClick={handleInvoiceClick}>
      <Eye />
    </button>
  );
};
