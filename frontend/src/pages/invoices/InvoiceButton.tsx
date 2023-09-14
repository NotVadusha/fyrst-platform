import React, { MouseEvent, useState, useEffect, useRef, MouseEventHandler } from 'react';
import { ReactComponent as More } from 'src/assets/icons/morevertical.svg';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import { invoicesApi } from 'src/common/store/api/packages/invoices/invoicesApi';
import JsFileDownloader from 'js-file-downloader';

interface InvoiceButtonProps {
  id: number;
}

export const InvoiceButton: React.FC<InvoiceButtonProps> = ({ id }) => {
  const [getPdf, { isFetching: isPdfFetching }] = invoicesApi.useLazyGetPdfLinkQuery();
  const [getBase64, { isFetching: isBase64Fetching }] = invoicesApi.useLazyGetPdfBase64Query();
  const [menuVisibility, setMenuVisibility] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const moreButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleMoreClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMenuVisibility(true);
  };

  const handleDownloadClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isBase64Fetching) return;
    try {
      const base64Response = await getBase64(id).unwrap();
      new JsFileDownloader({
        url: `data:application/octet-stream;base64,${base64Response.base64}`,
        autoStart: true,
        nameCallback: () => `invoice_${id}.pdf`,
      });
    } catch {
      toast({
        variant: 'destructive',
        title: 'Invoice in Pdf format',
        description: 'Cannot get a pdf file of the invoice, try again later',
      });
    }
  };

  const handleViewClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isPdfFetching) return;
    try {
      const linkResponse = await getPdf(id).unwrap();
      window.open(linkResponse.link, '_blank', 'noreferrer')?.focus();
    } catch {
      toast({
        variant: 'destructive',
        title: 'Invoice in Pdf format',
        description: 'Cannot get a pdf file of the invoice, try again later',
      });
    }
  };

  const handleClickOutside: EventListener = (e: Event) => {
    if (
      moreButtonRef.current &&
      menuRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      !moreButtonRef.current.contains(e.target as Node)
    )
      setMenuVisibility(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [moreButtonRef, menuRef]);

  return (
    <div className='relative'>
      <button
        className='w-5 h-5 hover:cursor-pointer'
        onClick={handleMoreClick}
        ref={moreButtonRef}
      >
        <More />
      </button>
      {menuVisibility ? (
        <div
          className='absolute flex flex-col px-2 py-2.5 w-[180px] top-7 right-0 bg-white rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.10)]'
          ref={menuRef}
        >
          <button
            className='w-full p-2 text-body-small leading-[18px] text-black text-left'
            onClick={handleViewClick}
          >
            View
          </button>
          <button
            className='w-full p-2 text-body-small leading-[18px] text-black text-left'
            onClick={handleDownloadClick}
          >
            Download
          </button>
        </div>
      ) : null}
    </div>
  );
};
