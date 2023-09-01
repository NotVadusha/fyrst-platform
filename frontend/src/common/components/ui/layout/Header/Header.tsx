import React from 'react';

export interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Header = ({ title, children, className }: HeaderProps) => {
  return (
    <div className={`py-5 px-20 shadow-header flex items-center gap-6 ${className}`}>
      <h1 className='text-2xl font-semibold text-dark-grey'>{title}</h1>
      {children}
    </div>
  );
};
