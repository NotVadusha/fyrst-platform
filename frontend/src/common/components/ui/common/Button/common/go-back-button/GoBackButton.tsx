import * as React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from 'src/assets/icons/arrow-left.svg';

export function GoBackButton({
  path,
  className,
  children,
}: {
  path: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link to={path} className={`flex items-center text-dark-grey gap-4 ${className} `}>
      <ArrowLeft />
      {children}
    </Link>
  );
}
