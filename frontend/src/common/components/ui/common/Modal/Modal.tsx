import React, { useEffect } from 'react';
import { ReactComponent as X } from 'src/assets/icons/x.svg';

export function Modal({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  children?: React.ReactNode;
}) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
      return;
    };

    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  });

  return (
    <>
      {!!open && (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative p-6 mx-auto min-w-[400px]'>
              <div className='rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                <div className='flex p-6 items-center justify-between gap-2 rounded-t'>
                  <h3 className='text-xl text-blue font-bold'>{title}</h3>
                  <button
                    className='p-1 ml-auto bg-transparent border-0 font-bold text-dark-grey float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                    onClick={() => onOpenChange(false)}
                  >
                    <X />
                  </button>
                </div>
                <hr className='border-b border-grey' />
                <div className='relative p-6 flex-auto'>{children}</div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      )}
    </>
  );
}
