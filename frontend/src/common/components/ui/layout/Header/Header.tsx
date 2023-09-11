import React from 'react';
import './Header.css';

export interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Header = ({ title, children, className }: HeaderProps) => {
  return (
    <div
      className={`sticky-header bg-white py-5 pl-20 pr-5 md:pr-20 h-[88px] w-full shadow-header flex items-center gap-6 ${className}`}
    >
      <h1 className='text-2xl font-semibold text-dark-grey'>{title}</h1>
      {children}
    </div>
  );
};
