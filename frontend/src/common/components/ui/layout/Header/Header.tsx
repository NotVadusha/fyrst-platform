import React from 'react';

export interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
}

export const Header = ({ title, children }: HeaderProps) => {
  return (
    <div className='py-5 px-20 shadow-header flex items-center gap-6'>
      <h1 className='text-2xl font-semibold text-dark-grey'>{title}</h1>
      {children}
    </div>
  );
};
