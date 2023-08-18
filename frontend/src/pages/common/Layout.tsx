import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/booking'>booking </Link>
            <Link to='/timecard'>timecard </Link>
            <Link to='/profile'>profile </Link>
            <Link to='/messanger'>messanger </Link>
            <Link to='/payment'>payment </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
