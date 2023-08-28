import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'src/components/ui/common/Toast/Toaster';

export function App() {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}
