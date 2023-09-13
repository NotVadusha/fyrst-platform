import React from 'react';
import './Header.css';
import { useBurgerMenuContext } from '../../../../context/BurgerMenuContext';
import { ReactComponent as BurgerIcon } from 'src/assets/icons/burger.svg';

export interface HeaderProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Header = ({ title, children, className }: HeaderProps) => {
  const { open, setIsOpen } = useBurgerMenuContext();

  return (
    <div
      className={`sticky-header bg-white py-5 pl-7 lg:pl-20 pr-5 md:pr-20 h-[88px] w-full shadow-header flex items-center gap-6 ${className}`}
    >
      <button onClick={() => setIsOpen(!open)} className='lg:hidden'>
        <BurgerIcon className='w-[20px] h-[20px]' />
      </button>
      <h1 className='text-2xl font-semibold text-dark-grey'>{title}</h1>
      {children}
    </div>
  );
};
