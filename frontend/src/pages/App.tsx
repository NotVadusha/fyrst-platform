import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'src/common/components/ui/common/Toast/Toaster';
import { SocketContext, socket } from 'src/common/config/packages/socket/socket.config';

export function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Outlet />
      <Toaster />
    </SocketContext.Provider>
  );
}
