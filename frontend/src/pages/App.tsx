import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'src/common/components/ui/common/Toast/Toaster';

export function App() {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}
