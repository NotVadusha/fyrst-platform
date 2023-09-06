import React from 'react';
import Notifications from 'src/common/components/ui/layout/notifications/Notifications';

export interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Header = ({ title, children, className }: HeaderProps) => {
  return (
    <div className='relative z-20'>
      <div
        className={`py-5 px-20 bg-white shadow-header flex items-center relative gap-6 ${className}`}
      >
        <h1 className='text-2xl font-semibold text-dark-grey'>{title}</h1>
        {children}
        <Notifications />
      </div>
    </div>
  );
};
